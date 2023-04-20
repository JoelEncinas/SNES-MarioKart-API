const checkHeader = (headerKey, headerValue) => (req, res, next) => {
  if (req.headers[headerKey] === headerValue) {
    return next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = checkHeader;
