# redux-cache-state-middleware
A middleware of redux npm package, that can cache the old state, to avoid next other operation and improve effective.
是一个redux的中间件，若存在配置的state，则中间dispatch操作，不继续后续更改state的值，达到“缓存”state的目的 。

## feature
* 当读取一个state的时候，该state若存在于“缓存”配置中，并且，存在有效值时，中间件将直接中断此次dispath的操作。
* 并不会去比较，新、旧state是否改变，存在有效值，则视为命中
* 可以在异步操作(thunk、saga)之前，注册中间件，有更好的效果

## 目标场景
* 多处读取，不常更新的 state数据

## 约定
* redux store中的state，必须是对象 {}
* dispatch的数据结构，必须是 { action: '', payload: {} }, payload为数据

## 配置
```
  const config = [
    {
      /**
      * dispatch的action名，字符串
      */
      action: 'QUERY_USER_LIST',
      /**
      * 用'.'隔开的字符串, '.代表层级'
      * query.user.list相当于，{ query: user: { list: {} } }
      */
      state: 'query.user.list',
    },
    ...
  ];
```

## 使用

```
  // 初始化 中间件.
  const cacheStateMiddleware = createCacheStateMiddleware(config);

  // 向store中，注册中间件.
  const store = createStore(
    changeData,
    preloadState,
    applyMiddleware(cacheStateMiddleware),
  );
```

## 集成
 - [jest](https://github.com/facebook/jest)
 - [redux-mock-store](https://github.com/dmitry-zaets/redux-mock-store)