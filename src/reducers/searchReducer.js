import { SEARCH_LOADING, SEARCH_COMPLETE, RESET_SEARCH } from '../actions/constants';

const initialState = {
  loading: false,
  searchField: "",
  searchResults: []
}

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;

    case SEARCH_LOADING:
      return {
        ...state,
        loading: true,
        searchField: action.payload
      }

    case SEARCH_COMPLETE:
      return {
        ...state,
        loading: false,
        searchResults: action.payload
      }

    case RESET_SEARCH:
      return {
        ...state,
        loading: false,
        searchField: "",
        searchResults: []
      }
  }
}