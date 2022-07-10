import axios from 'axios';

const URL = 'http://www.omdbapi.com';
const apikey = 'ae867a74';

export const getSearchMovies = (s, type, Y, page) => axios({
  method: 'get',
  url: URL,
  params: {
    apikey,
    s,
    type,
    Y,
    page,
  },
});
export const getFindDetails = (id) => axios({
  method: 'get',
  url: URL,
  params: {
    apikey,
    i: id,
  },
});
