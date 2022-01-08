import { Post } from "../types"

const targets = ["box", "wolt", "efood", "e-food"]

export default ({ title, store, is_expired }: Post) => {
  return (
    targets.some(
      (target) =>
        title.toLowerCase().includes(target) ||
        store?.toLowerCase().includes(target)
    ) && !is_expired
  )
}
