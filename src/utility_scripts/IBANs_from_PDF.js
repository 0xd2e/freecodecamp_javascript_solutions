#!usr/bin/node

'use strict';

/* eslint-env node, amd */
/* eslint no-console: "off" */
/* eslint indent: ["error", 4, { "SwitchCase": 1 }] */

/*
 * What this script does:
 * -- download PDF file (https://www.swift.com/resource/iban-registry-pdf)
 * -- extract necessary data
 * -- clean, organize, and transform the data
 * -- print result to the console
 *    (regular expression for validating IBAN format of each country)
 *
 * Everything is performed in memory - no file is saved locally.
 */

const axios = require('axios');
const pdfparse = require('pdf-parse');


const showPdfInfo = (pdfData) => {
    /*
     * Print a short summary of the parsed PDF file and return
     * the PDF object so that it can be used again in a promise chain.
     */

    // eslint-disable-next-line object-curly-newline
    const { numpages, numrender, text, version, info, metadata } = pdfData;

    console.log(`Number of pages: ${numrender} rendered / ${numpages} total`);
    console.log(`String content: ${text.length} characters / ${text.split('\n').length} lines`);
    console.log('Using PDF parser/renderer version:', version);

    const concatenate = ([key, value]) => `${key}: ${value}`;

    for (const [key, val] of Object.entries({ 'PDF info:': info, 'PDF metadata:': metadata })) {
        if (val) console.log([key, ...Object.entries(val).map(concatenate)].join('\n\t'));
    }

    return pdfData;
};


const filterRows = (pdfData) => {
    /*
     * Extract necessary data and return it as a nested array:
     * 0. array of strings with ISO 3166-1 alpha-2 country codes;
     * 1. array of strings with country names;
     * 2. array of strings with BBAN format for each country.
     */

    const rows = pdfData.text.split('\n')
        .map((row) => row.trim())
        .filter((row) => row); // remove empty lines

    const formats = rows.filter((row) => row.startsWith('BBAN structure'))
        .map((row) => row.slice(15)); // retain only second column

    const countryRegExp = /^2\.\d+ ([A-Z]{2}) – ([a-zA-Z (),-]+)$/; // page title
    const codes = [];
    const names = [];

    rows.filter((row) => countryRegExp.test(row))
        .forEach((row) => {
            const [, code, name] = countryRegExp.exec(row);
            codes.push(code);
            names.push(name);
        });

    if (codes.length !== formats.length) {
        throw new Error('Country and BBAN format lists have different lengths.');
    }

    return [codes, names, formats];
};


const cleanCountryName = (name) => {

    if (name.endsWith(')')) {
        name = name.replace(' (The)', '');
    }

    if (name.includes(',')) {
        name = name.split(',')[0];
    }

    return name;
};


const cleanFormats = (formats) => {
    /*
     * Group successive similar terms in BBAN and separate the groups
     * (to ease splitting individual BBAN).
     *
     * Return an array of strings.
     */

    const fieldRegExp = /(\d+![acn])/g;

    return formats.map((bban) => {

        const groups = [];
        let prevChar = '';
        let currChar;
        let currNum;

        for (const group of bban.match(fieldRegExp)) {
            [currNum, currChar] = group.split('!');
            if (currChar !== prevChar) {
                groups.push([currChar, parseInt(currNum)]);
                prevChar = currChar;
            } else {
                groups[groups.length - 1][1] += parseInt(currNum);
            }
        }

        return groups.map((group) => group.join('!'))
            .join(' ');
    });
};


const convertFormats = (codes, formats) => {
    /*
     * Create a string for each country with a regular expression
     * pattern for verifying its IBAN format.
     * It is suited to RegExp constructor.
     *
     * Return an array of strings.
     */

    const toRegExpPattern = (group) => {
        const [char, num] = group.split('!');
        switch (char) {
            case 'n': return `\\d{${num}}`; // digit(s)
            case 'a': return `[A-Z]{${num}}`; // uppercase letter(s)
            case 'c': return `[a-zA-Z0-9]{${num}}`; // digits, uppercase letters, lowercase letters
            default: throw new Error(`Cannot convert unknown symbol '${char}'`);
        }
    };

    return formats.map((pattern, i) => {
        const countryCode = codes[i];
        const checkDigits = '\\d{2}';
        try {
            pattern = pattern.split(' ').map(toRegExpPattern).join('');
        } catch (err) {
            throw new Error(`${err.message} for ${i}. ${countryCode}`);
        }
        return `^${countryCode}${checkDigits}${pattern}$`;
    });
};


const printResult = (data) => {
    /*
     * Print code, name, and IBAN regular expression of each country and return
     * the original data so that it can be used again in a promise chain.
     */

    const [countryCodes, countryNames, formats] = data;
    const n = countryCodes.length;
    const nDigits = n.toString().length;
    const arr = [];

    let code;
    let name;
    let pattern;
    let i = 0;

    for (i; i < n; ++i) {
        code = countryCodes[i];
        name = countryNames[i];
        pattern = formats[i];
        arr.push(`${i.toString().padStart(nDigits, ' ')}. ${code}: /${pattern}/, // ${name}`);
    }

    console.log(arr.join('\n'));

    return data;
};


const requestConfig = {
    url: 'https://www.swift.com/sites/default/files/documents/iban_registry_0.pdf',
    method: 'get',
    headers: {
        'Content-type': 'text/pdf; charset=UTF-8'
    },
    timeout: 2000, // in milliseconds
    withCredentials: false,
    responseType: 'arraybuffer',
    maxContentLength: 2097152, // maximum response content size in bytes (2MB)
    maxRedirects: 0, // maximum number of redirections, 0 forbids redirections
    decompress: true
};


axios(requestConfig)
    .then(({ data: pdfFileBuffer }) => {
        console.log(`PDF file buffer size: ${pdfFileBuffer.byteLength} bytes`);
        const options = { max: 0, version: 'v1.10.100' }; // use default options
        // PDF parser may show a message: "Warning: TT: undefined function"
        // It seems to be a false alarm: https://github.com/mozilla/pdf.js/issues/3768#issuecomment-36468349
        return pdfparse(pdfFileBuffer, options);
    })
    .then(showPdfInfo)
    .then(filterRows)
    .then((data) => {
        const [countryCodes] = data;
        console.log(`Number of countries: ${countryCodes.length}`);
        let [, countryNames, formats] = data;
        formats = cleanFormats(formats);
        formats = convertFormats(countryCodes, formats);
        countryNames = countryNames.map(cleanCountryName);
        return [countryCodes, countryNames, formats];
    })
    .then(printResult)
    .catch((err) => {
        console.error(err.message);
    });
