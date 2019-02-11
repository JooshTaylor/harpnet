import {
  SEARCH_LOADING,
  SEARCH_COMPLETE,
  RESET_SEARCH,
  RELOAD_SEARCH
} from '../actions/constants'

const initialState = {
  loading: false,
  searchField: '',
  searchResults: [],
  reload: false
}

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state

    case SEARCH_LOADING:
      return {
        ...state,
        loading: true,
        searchField: action.payload,
        reload: false
      }

    case SEARCH_COMPLETE:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
        reload: false
      }

    case RESET_SEARCH:
      return {
        ...state,
        loading: false,
        searchField: '',
        searchResults: [],
        reload: false
      }

    case RELOAD_SEARCH:
      return {
        ...state,
        reload: true
      }
  }
}
