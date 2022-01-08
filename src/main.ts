import express from "express"
import helmet from "helmet"
import apiRoutes from "./routes/api"
import { PORT } from "./config/env"
import { rateLimit } from "./middlewares"

const app = express()

app.set("trust proxy", 1)

app.use(rateLimit)
app.use(helmet())
app.use("/api", apiRoutes)

app.listen(PORT, () => console.log("Listening..."))
