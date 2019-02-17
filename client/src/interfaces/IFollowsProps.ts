import IProfile from './IProfile'

export default interface IFollowsProps {
  following: number[]
  followers: number[]
  suggestions: IProfile[]
  reloadSuggestions: boolean
  loading: boolean
  reduxLoaded: boolean
}
