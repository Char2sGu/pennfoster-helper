/**
 * Adjust the initial HTML to avoid being forbidden by the Content Security Policy.
 */

/* eslint-disable @typescript-eslint/no-var-requires */

const { readFileSync, writeFileSync } = require('fs');
const { load } = require('cheerio');

const path = 'dist/browser-extension/index.html';
const $ = load(readFileSync(path, { encoding: 'utf-8' }));

// avoid inline scripts by disabling lazy loading styles.
$('[media="print"][onload]').removeAttr('media onload');

writeFileSync(path, $.root().html(), { encoding: 'utf-8' });
