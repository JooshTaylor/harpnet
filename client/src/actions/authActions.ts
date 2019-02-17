import {
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_ERRORS,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_USER,
  CLEAR_ERRORS,
  AUTHENTICATE_USER,
  CLEAR_PROFILE,
  CLEAR_FOLLOWS,
  CLEAR_POSTS,
  SET_PROFILE,
  SET_FOLLOWS
} from './constants'
import axios from 'axios'
import { navigate } from '@reach/router'
import IRegisterUser from '../interfaces/IRegisterUser'
import ILoginUser from '../interfaces/ILoginUser'
import IUser from '../interfaces/IUser'
import { ThunkDispatch } from 'redux-thunk'

export const registerUser = (userData: IRegisterUser) => (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  dispatch({
    type: REGISTER_PENDING
  })

  axios
    .post(`/api/auth/register`, userData)
    .then(() => {
      dispatch({
        type: REGISTER_SUCCESS
      })

      dispatch({
        type: CLEAR_ERRORS
      })

      navigate('/login')
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL
      })

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const loginUser = (userData: ILoginUser) => (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  dispatch({
    type: LOGIN_PENDING
  })

  axios
    .post(`/api/auth/login`, userData)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS
      })

      //Store our token in session storage in the user's browser
      window.localStorage.setItem('token', res.data.session.token)

      // Set users sets the auth, profile and follows data in the redux store.
      dispatch({
        type: SET_USER,
        payload: res.data.auth
      })

      dispatch({
        type: SET_PROFILE,
        payload: res.data.profile
      })

      dispatch({
        type: SET_FOLLOWS,
        payload: res.data.follows
      })

      navigate('/feed')
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL
      })

      if (err.response === undefined) {
        navigate('/feed')
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    })
}

export const authenticateUser = (userData: IUser) => {
  return {
    type: AUTHENTICATE_USER,
    payload: userData
  }
}

export const logoutUser = (token: string) => (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  axios.put(
    '/api/auth/logout',
    {},
    {
      headers: {
        Authorization: token
      }
    }
  )

  dispatch({
    type: SET_USER,
    payload: {}
  })

  dispatch({
    type: CLEAR_PROFILE
  })

  dispatch({
    type: CLEAR_FOLLOWS
  })

  dispatch({
    type: CLEAR_POSTS
  })
}

export const deleteAccount = (id: number, token: string) => (
  dispatch: ThunkDispatch<{}, {}, any>
) => {
  axios.delete(`/api/auth/delete/${id}`, {
    headers: {
      Authorization: token
    }
  })
  localStorage.removeItem('token')
}
