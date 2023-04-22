const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again after a minute",
});

module.exports = limiter;
