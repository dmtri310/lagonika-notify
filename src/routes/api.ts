import { Router } from "express"
import { differenceWith, isEqual, omit } from "lodash"
import { prisma, redis } from "../services"
import { scrapePosts, includeTarget, sendMail } from "../utils"
import type { Post } from "../types"
import setCache from "../utils/setCache"

const r = Router()

// CRON
r.post("/refresh", async (_, res) => {
  const cache = await redis.get("cache")

  if (cache) {
    return res.json({
      type: "cache",
      data: <Post[]>JSON.parse(cache),
    })
  }

  const posts = await scrapePosts()
  const dbPosts = <Post[]>(
    (await prisma.post.findMany()).map((post) => omit(post, "id"))
  )

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

  if (!updatedPosts.length) {
    const latestUpdatedPosts = await setCache()
    return res.json({ type: "no_change", data: JSON.parse(latestUpdatedPosts) })
  }

  await redis.set("latest-update", JSON.stringify(updatedPosts))
  await setCache()

  const targetPosts = updatedPosts.filter(includeTarget)

  if (targetPosts.length) sendMail(targetPosts)

  res.json({
    type: "update_found",
    data: updatedPosts,
  })
})

export default r
