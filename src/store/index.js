import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import moviesReducer from './reducers/movies';

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
