import { Router } from "express"
import { differenceWith, isEqual, omit } from "lodash"
import { prisma, redis } from "../services"
import scrapePosts from "../utils/scrapePosts"

const r = Router()

r.get("/posts", (_, res) => {})

// CRON
r.post("/refresh", async (_, res) => {
  const cache = await redis.get("posts")

  if (cache) {
    return res.json(JSON.parse(cache))
  }

  const posts = await scrapePosts()
  const dbPosts = (await prisma.post.findMany()).map((post) => omit(post, "id"))

  // Filter only new and edited posts
  const newAndEditedPosts = differenceWith(posts, dbPosts, isEqual)

  const requests = newAndEditedPosts.map((post) =>
    prisma.post.upsert({
      where: { post_id: post.post_id },
      create: post,
      update: post,
    })
  )

  const updatedPosts = await prisma.$transaction(requests)

  await redis.setex("posts", 180, JSON.stringify(posts))

  res.json(posts)
})

export default r
