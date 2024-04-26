function capitalizeEachWord(str) {
  return str.toLowerCase().replace(/^(.)|\s+(.)/g, function ($1) {
    return $1.toUpperCase();
  });
}
function toLowerCaseWholeWord(str) {
  return str.replace(/\b\w+\b/g, function (word) {
    return word.toLowerCase();
  });
}
function toSentenceCase(str) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}
function capitalizeFullWord(str) {
  return str.toLowerCase().replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

module.exports = {
  capitalizeEachWord,
  capitalizeFullWord,
  toSentenceCase,
  toLowerCaseWholeWord
};
