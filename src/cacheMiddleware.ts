import {
  CacheConfigType,
  CacheConfigItemType,
} from './interface';

/**
 * destructure data by varible key.
 * @param data params to destructure.
 * @param key string.
 */
const getChainDataByVarKey = (data: any, key: string) => {
  const keys = key.split('.');
  return keys.reduce((newData: any, currentKey: string) => newData[currentKey], data);
};

/**
 * validate params is empty.
 * return false: not empty, true: empty
 * @param data params to validate whether empty.
 * @returns boolean.
 */
const isEmpty = (data: any): boolean => {
  switch (typeof data) {
    case 'string':
      return data === '';
    case 'object':
      if (data instanceof Array) {
        return data.length === 0;
      }
      return data === null;
    case 'boolean':
      return data === false;
    case 'undefined':
      return data === undefined;
    default:
      return !data;
  }
};

// eslint-disable-next-line.
export const createCacheStateMiddleware = <A extends {
  type: string,
  payload: any,
}>(
  config: CacheConfigType,
  callback?: Function,
) => (
    (midAPI: any) => (next: any) => (action: A) => {
      // const config = getCacheConfig();
      // cache-config is empty, go next middleware.
      if (!config) {
        return next(action);
      }
      // if force refresh, go next middleware.
      const { type, payload } = action;
      if (
        payload instanceof Object
        && Object.prototype.hasOwnProperty.call(payload, 'forceRefresh')
        && payload.forceRefresh === true
      ) {
        return next(action);
      }

      const hitAction = config.find((item: CacheConfigItemType) => item.action === type);
      // not found action in cache-config, go next middleware.
      if (hitAction !== undefined) {
        const oldState = getChainDataByVarKey(midAPI.getState(), hitAction.state);
        if (callback) {
          callback(oldState, midAPI.getState(), hitAction);
        }
        if (isEmpty(oldState)) {
          return next(action);
        }
        return false;
      }
      return next(action);
    }
  );
