import {createEpicMiddleware} from 'redux-observable';
import rootReducer from './rootReducer';
import {persistStore, persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {createLogger} from 'redux-logger';
import rootEpic from './rootEpic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

const createStore = () => {
  const isDev = Platform.OS === 'web' ? process.env.NODE_ENV === 'development' : __DEV__;

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
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
