import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});

serviceWorkerRegistration.register();
