import React, {useEffect} from 'react';
import 'reflect-metadata';
import RootView from './app/navigation/components/RootView';
import createStore from './core/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {setUpLocalization} from './app/theme/Localization';

const {store, persistor} = createStore();

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
