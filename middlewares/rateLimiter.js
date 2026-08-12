const rateLimit = require('express-rate-limit')

// 15 محاولات كل 15 دقيقة على login
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // حد أقصى 5 محاولات
  message: 'too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
})

// 30 رسالة كل ساعة على contact form
exports.contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 30,
  message: 'too many messages sent, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
})

// 100 طلب كل دقيقة للـ public endpoints
exports.publicLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  message: 'too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
})
