import rateLimit from "express-rate-limit"

export const Authlimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})

export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})