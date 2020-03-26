import configureStore from 'redux-mock-store'
import {
  assertions,
  registerMiddlewares,
  buildInitialStoreState,
  registerInitialStoreState,
} from 'redux-actions-assertions';
import { registerAssertions } from 'redux-actions-assertions/expect';
import { createCacheStateMiddleware } from '../src/cacheMiddleware';

// redux cache config.
const config = [
  {
    action: 'test2',
    state: 'name',
  },
];

registerAssertions();
registerMiddlewares([
  createCacheStateMiddleware(config),
]);
registerInitialStoreState({ name: 'initial name' });

// registerInitialStoreState(buildInitialStoreState((state, action) => {
//   switch (action.type) {
//     case 'test':
//       return { name: 'reduce name' };
//   }
//   return { name: 'none' };
// }));

test('should not hit cache', () => {
  const getAction = () => ({
    type: 'test',
  });

  assertions.toDispatchActionsWithState(
    (init) => {
      return { name: 'change name'};
    },
    getAction(),
    [{
      type: 'test',
    }],
  );
});
