// middlewares/rateLimiters.js
const rateLimit = require("express-rate-limit");

// Login: Max 5 attempts in 15 minutes per IP
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Admin creation: Max 3 requests in 1 hour per IP
const adminCreationRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: "Too many admin creation attempts. Try again after an hour.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Employee creation: Max 5 requests per hour per IP
const employeeCreationRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many employee account creation attempts. Try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  loginRateLimiter,
  adminCreationRateLimiter,
  employeeCreationRateLimiter,
};
