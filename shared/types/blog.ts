export interface BlogPost {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: { likes: number; dislikes: number }
  views: number
  userId: number
}

export interface BlogListResponse {
  posts: BlogPost[]
  total: number
  skip: number
  limit: number
}

export interface BlogComment {
  id: number
  body: string
  postId: number
  likes: number
  user: { id: number; username: string; fullName: string }
}

export interface BlogCommentsResponse {
  comments: BlogComment[]
  total: number
  skip: number
  limit: number
}
