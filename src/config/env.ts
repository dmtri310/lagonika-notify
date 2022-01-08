import "dotenv/config"

export const {
  NODE_ENV,
  PORT,
  REDIS_URL,
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  EMAIL_TO,
} = process.env

export const __prod__ = NODE_ENV === "production"
