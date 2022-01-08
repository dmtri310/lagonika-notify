import { EMAIL_TO, MAILGUN_DOMAIN } from "../config/env"
import { mg } from "../services"
import { Post } from "../types"

export default (posts: Post[]) => {
  posts.map(async ({ title, desc, image }) => {
    await mg.messages.create(<string>MAILGUN_DOMAIN, {
      from: "Lagonika Notify <update@lagonika-notify.mailgun.org>",
      to: [EMAIL_TO],
      subject: title,
      html: `<img src="${image}" alt="image_alt"/><br/><p>${desc}</p>`,
    })
  })
}
