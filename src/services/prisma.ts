import { PrismaClient } from "@prisma/client"
import options from "../config/prisma"

export default new PrismaClient(options)
