import { createCacheStateMiddleware } from '../src/cacheMiddleware';

const next = jest.fn((action) => {
  console.log('next action');
  return true;
});

test('should not hit cache', () => {
  const initialState = {
    test: 'test name',
  };
  const action = jest.fn();
  const mockStore = {
    getState: jest.fn(() => (initialState)),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }
  const config = [
    {
      action: 'queryWarehouseListAction',
      state: 'query.warehouseList',
    },
  ];

  const middleware = createCacheStateMiddleware(config);
  const res = middleware(mockStore)(next)(action);
  expect(res).toBe(true);
})

