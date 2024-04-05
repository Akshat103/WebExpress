// utils.js

function toSentenceCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function toEveryFirstLetterCapital(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

function toEveryLetterCapital(str) {
    return str.toUpperCase();
}

module.exports = {
    toSentenceCase,
    toEveryFirstLetterCapital,
    toEveryLetterCapital
};
