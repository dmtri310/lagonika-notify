import { Prisma } from ".prisma/client"
import { __prod__ } from "./env"

export default <
  | Prisma.Subset<Prisma.PrismaClientOptions, Prisma.PrismaClientOptions>
  | undefined
>{
  log: __prod__ ? ["error"] : ["error", "query", "warn"],
}
