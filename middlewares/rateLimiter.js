const rateLimit = require('express-rate-limit')


exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: 'too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
})


exports.contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 30,
  message: 'too many messages sent, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
})

exports.publicLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: 'too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
})
