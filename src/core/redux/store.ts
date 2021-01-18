import {createEpicMiddleware} from 'redux-observable';
import rootReducer from './rootReducer';
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import rootEpic from './rootEpic';

const createStore = (storage: any, isDev: boolean) => {
  const persistConfig = {
    key: 'root',
    storage,
  };

  const middleware = [];
  const epicMiddleware = createEpicMiddleware();
  middleware.push(epicMiddleware);
  if (isDev) {
    middleware.push(createLogger());
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    devTools: isDev,
    middleware: middleware,
  });

  epicMiddleware.run(rootEpic);

  const persistor = persistStore(store);

  return {store, persistor};
};

export default createStore;
