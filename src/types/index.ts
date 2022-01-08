export interface Post {
  post_id: number
  title: string
  store: string | null
  desc: string
  price: string | null
  image: string
  author: string
  is_expired: boolean
}
