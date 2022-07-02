import {
  CLEAR_INFO_ABOUT,
  CLEAR_STATE,
  FIND_INFO_ABOUT,
  LOAD_MORE_MOVIES,
  NO_MATCHES,
  NO_MORE_MATCHES,
  SEARCH_MOVIES,
  START_LOADING,
  START_LOADING_MORE,
} from '../types';

const initialState = {
  Movies: [],
  infoAbout: {},
  isLoading: false,
  areThereMatches: true,
};

// eslint-disable-next-line default-param-last
const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING: {
      return {
        ...state,
        Movies: [],
        isLoading: true,
        areThereMatches: true,
      };
    }
    case SEARCH_MOVIES: {
      return {
        ...state,
        Movies: action.payload,
        isLoading: true,
        areThereMatches: true,
      };
    }
    case START_LOADING_MORE: {
      return {
        ...state,
        isLoading: true,
        areThereMatches: true,
      };
    }
    case LOAD_MORE_MOVIES: {
      return {
        ...state,
        Movies: [...state.Movies, ...action.payload],
        isLoading: true,
        areThereMatches: true,
      };
    }
    case NO_MORE_MATCHES: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case NO_MATCHES: {
      return {
        ...state,
        Movies: [],
        isLoading: false,
        areThereMatches: false,
      };
    }
    case FIND_INFO_ABOUT: {
      return {
        ...state,
        infoAbout: action.payload,
      };
    }
    case CLEAR_INFO_ABOUT: {
      return {
        ...state,
        infoAbout: {},
        isLoading: false,
      };
    }
    case CLEAR_STATE: {
      return initialState;
    }
    default:
      return state;
  }
};

export default moviesReducer;
