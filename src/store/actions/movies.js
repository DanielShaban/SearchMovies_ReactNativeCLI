/* eslint-disable no-alert */
import movies from '../../api/apiRequests/movies';
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

export const SearchMovies = (s = '', page = 1, type = '', Y = '') => async (dispatch) => {
  try {
    const res = await movies.getSearchMovies(s, type, Y, page);
    if (res.data.Response === 'False' && page <= 2) {
      dispatch({
        type: NO_MATCHES,
        payload: res.data.Search,
      });
    } else if (res.data.Response === 'False' && page > 1) {
      dispatch({
        type: NO_MORE_MATCHES,
      });
    } else if (page === 1) {
      dispatch({
        type: SEARCH_MOVIES,
        payload: res.data.Search,
      });
    } else {
      dispatch({
        type: LOAD_MORE_MOVIES,
        payload: res.data.Search,
      });
    }
  } catch (e) {
    // console.log(e);
  }
};
export const StartLoading = () => ({
  type: START_LOADING,
});
export const FindDetails = (Id) => async (dispatch) => {
  try {
    const res = await movies.getFindDetails(Id);
    // console.log(res.data);
    dispatch({
      type: FIND_INFO_ABOUT,
      payload: res.data,
    });
  } catch (e) {
    // eslint-disable-next-line no-undef
    alert('Error cant find details');
  }
};
export const ClearInfoAbout = () => (dispatch) => {
  dispatch({
    type: CLEAR_INFO_ABOUT,
  });
};
export const StartLoadingMore = () => (dispatch) => {
  dispatch({
    type: START_LOADING_MORE,
  });
};
export const ClearSearch = () => (dispatch) => {
  dispatch({
    type: CLEAR_STATE,
  });
};
