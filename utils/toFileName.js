const toFilename = function (str, isGif) {
  let url = str.replace(".", "").replace(/\s/g, "-").toLowerCase();
  return url + (isGif === true ? ".gif" : ".png");
};

module.exports = toFilename;
