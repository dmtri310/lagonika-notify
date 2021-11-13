import express from "express"
import apiRoutes from "./routes/api"
import { PORT } from "./config/env"

const app = express()

app.use("/api", apiRoutes)

app.listen(PORT, () => console.log("Listening..."))
