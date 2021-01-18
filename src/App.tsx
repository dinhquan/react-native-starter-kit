import React, {useEffect} from 'react';
import 'reflect-metadata';
import RootView from './ui/navigation/components/RootView';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createStore from './core/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Platform} from 'react-native';
import {setUpLocalization} from './ui/theme/Localization';

const {store, persistor} = createStore(
  Platform.OS === 'web' ? storage : AsyncStorage,
  Platform.OS === 'web' ? process.env.NODE_ENV === 'development' : __DEV__,
);

function App() {
  useEffect(() => {
    setUpLocalization();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootView />
      </PersistGate>
    </Provider>
  );
}

export default App;
