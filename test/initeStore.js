import {
  createStore,
  applyMiddleware,
} from 'redux';

/**
 * reducer handler.
 * @param {*} state 
 * @param {*} action 
 */
function changeData(state = '', action) {
  switch (action.type) {
    case 'change_name':
      return { ...state, ...action.payload };
    case 'change_sex':
      return { ...state, ...action.payload };
    case 'change_age':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

/**
 * create a redux store.
 */
const store = (middleware, preloadState) => createStore(
  changeData,
  preloadState,
  applyMiddleware(middleware),
);

export default store;
