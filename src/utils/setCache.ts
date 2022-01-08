import { redis } from "../services"

export default async () => {
  const latestUpdatedPosts = (await redis.get("latest-update")) || "[]"

  await redis.setex("cache", 60 * 5, JSON.stringify(latestUpdatedPosts))

  return latestUpdatedPosts
}
