import axios from "axios"
import { load } from "cheerio"

const url = "https://www.lagonika.gr/"
const selector = {
  posts: "#main div[class^=post-]",
  title: ".la-listview-title a",
  desc: ".la-listview-content p",
  price: ".la-offer-price",
  image: ".lagonika-listview-offer-top-image img",
  author: ".la-offer-author a",
}

export default async () => {
  const { data } = await axios.get<string>(url, { responseType: "text" })
  const $ = load(data)

  return $(selector.posts)
    .map((_, post) => ({
      post_id: Number(
        $(post)
          .attr("class")
          ?.split(" ")
          .find((el) => el.startsWith("post-"))
          ?.replace("post-", "")
      ),
      title: $(post).find(selector.title).text(),
      desc: $(post).find(selector.desc).text(),
      price: $(post).find(selector.price).text().trim() || null,
      image: $(post).find(selector.image).attr("src")!,
      author: $(post).find(selector.author).text().trim(),
      is_expired: $(post)
        .attr("class")!
        .split(" ")
        .includes("la-expired-offer"),
    }))
    .get()
    .reverse()
}
