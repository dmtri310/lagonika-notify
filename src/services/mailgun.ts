import FormData from "form-data"
import Mailgun from "mailgun.js"
import { MAILGUN_API_KEY } from "../config/env"

const mailgun = new Mailgun(FormData)

export default mailgun.client({
  username: "api",
  key: <string>MAILGUN_API_KEY,
})
