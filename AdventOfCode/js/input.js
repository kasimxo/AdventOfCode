const path = require('path');
const fs = require('fs');

const input = fs
    .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
    .toString()
    .trim()
    .split('\n');

function readInput() {
    var texto = fs
        .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
        .toString()
        .trim()
    return texto
}

function readLines() {
    var texto = fs
        .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
        .toString()
        .trim()
        .split('\r\n')
    return texto
}
function readLinesExample() {
    var texto = fs
        .readFileSync(path.join(__dirname, 'example.txt'), 'utf8')
        .toString()
        .trim()
        .split('\r\n')
    return texto
}

function readLinesExample() {
    var texto = fs
        .readFileSync(path.join(__dirname, 'example.txt'), 'utf8')
        .toString()
        .trim()
        .split('\r\n')
    return texto
}

module.exports = {
    input, readInput, readLines, readLinesExample
};