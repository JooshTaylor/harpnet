export default interface IComment {
  comment_id: number
  post_id: number
  creator_id: number
  creator_username: string
  text: string
  score: number
  comment_date: string
}
