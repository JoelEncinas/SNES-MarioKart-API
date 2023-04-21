const toFilename = function (str, isGif) {
  return str.replace(".", "").replace(/\s/g, "-").toLowerCase() + isGif
    ? ".gif"
    : ".png";
};

module.exports = toFilename;
