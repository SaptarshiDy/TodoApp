import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

// import Notification from './src/services/Notification';
// Notification.schedule();

AppRegistry.registerComponent(appName, () => App);
