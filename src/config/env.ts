import "dotenv/config"

export const { NODE_ENV = "development", PORT = 4000, REDIS_URI } = process.env

export const __prod__ = NODE_ENV === "production"
