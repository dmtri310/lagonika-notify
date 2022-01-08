import Redis from "ioredis"
import { REDIS_URL } from "../config/env"

export default new Redis(REDIS_URL)
