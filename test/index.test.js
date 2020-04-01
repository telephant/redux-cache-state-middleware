
import store from './initeStore';
import {
  createCacheStateMiddleware,
} from '../src/cacheMiddleware';

const config = [
  {
    action: 'change_name',
    state: 'name',
  },
  {
    action: 'change_sex',
    state: 'sex',
  },
];
const cacheStateMiddleware = createCacheStateMiddleware(config);

test('action in config, dispatch an action to an exist state', () => {
  const preloadState = {
    name: 'redux init name',
  };
  const storeMan = store(cacheStateMiddleware, preloadState);
  // get init state.
  const initState = storeMan.getState();
  // do dispatch.
  storeMan.dispatch({
    type: 'change_name',
    payload: {
      name: 'change name',
    },
  });

  expect(storeMan.getState().name).toBe(initState.name);
});

test('action in config, dispatch an action to a not exist state', () => {
  const preloadState = {};
  const storeMan = store(cacheStateMiddleware, preloadState);

  // do dispatch.
  storeMan.dispatch({
    type: 'change_sex',
    payload: {
      sex: 'male',
    },
  });
  expect(storeMan.getState().sex).toBe('male');
});

test('action not in config, dispatch an action to an exist state', () => {
  const preloadState = {
    age: 18,
  };
  const storeMan = store(cacheStateMiddleware, preloadState);
  // do dispatch.
  storeMan.dispatch({
    type: 'change_age',
    payload: {
      age: 80,
    },
  });

  expect(storeMan.getState().age).toBe(80);
});

test('action not in config, dispatch an action to a not exist state', () => {
  const preloadState = {};
  const storeMan = store(cacheStateMiddleware, preloadState);
  // do dispatch.
  storeMan.dispatch({
    type: 'change_age',
    payload: {
      age: 80,
    },
  });

  expect(storeMan.getState().age).toBe(80);
});
