/* eslint-disable no-alert */
import { getFindDetails, getSearchMovies } from '../../api/apiRequests/movies';
import {
  CLEAR_INFO_ABOUT,
  CLEAR_STATE,
  FIND_INFO_ABOUT,
  LOAD_MORE_MOVIES,
  NO_MATCHES,
  NO_MORE_MATCHES,
  LOAD_MOVIES,
  START_LOADING,
  START_LOADING_MORE,
} from '../types';

export const searchMovies = (s = '', page = 1, type = '', Y = '') => async (dispatch) => {
  try {
    const res = await getSearchMovies(s, type, Y, page);
    if (res.data.Response === 'False' && page === 1) {
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
        type: LOAD_MOVIES,
        payload: res.data.Search,
      });
    } else {
      dispatch({
        type: LOAD_MORE_MOVIES,
        payload: res.data.Search,
      });
    }
  } catch (e) {
    // eslint-disable-next-line no-undef
    alert(e);
  }
};
export const startLoading = () => ({
  type: START_LOADING,
});
export const fndDetails = (id) => async (dispatch) => {
  try {
    const res = await getFindDetails(id);
    // console.log(res.data);
    dispatch({
      type: FIND_INFO_ABOUT,
      payload: res.data,
    });
  } catch (e) {
    // eslint-disable-next-line no-undef
    alert(e);
  }
};
export const clearInfoAbout = () => (dispatch) => {
  dispatch({
    type: CLEAR_INFO_ABOUT,
  });
};
export const startLoadingMore = () => (dispatch) => {
  dispatch({
    type: START_LOADING_MORE,
  });
};
export const clearSearch = () => (dispatch) => {
  dispatch({
    type: CLEAR_STATE,
  });
};
