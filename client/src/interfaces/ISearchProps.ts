import IProfile from './IProfile'

export default interface ISearchProps {
  loading: boolean
  searchField: string
  searchResults: IProfile[]
  reload: boolean
}
