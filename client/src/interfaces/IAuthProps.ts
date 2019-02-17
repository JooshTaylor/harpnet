import IUser from './IUser'

export default interface IAuthProps {
  loading: boolean
  user: number | IUser
  isLoggedIn: boolean
}
