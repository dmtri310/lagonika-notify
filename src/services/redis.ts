import Redis from "ioredis"
import { REDIS_URI } from "../config/env"

export default new Redis(REDIS_URI)
