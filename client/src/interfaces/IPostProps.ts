import IPost from './IPost'
import IComment from './IComment'
import IProfile from './IProfile'

export default interface IPostProps {
  posts: IPost[]
  comments: IComment[]
  morePosts: boolean
  deleteState: boolean
  loading: boolean
  reduxLoaded: boolean
  reload: boolean
  single: IPost
  singleReload: boolean
  profile: IProfile
}
