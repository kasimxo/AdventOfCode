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

module.exports = {
    input, readInput
};