import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

// AppRegistry.registerComponent(appName, () => (
//     return (
//         <Provider store={store}>
//             <App />
//         </Provider>
//     )
// ));

const AppRoot = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => AppRoot);
