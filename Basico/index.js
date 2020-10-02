/**
 * @format
 */

import {AppRegistry,YellowBox} from 'react-native';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import storeConfig from './src/main/store/storeConfig';
import 'react-native-gesture-handler';

YellowBox.ignoreWarnings(['AsyncStorage has been extracted from react-native core','Require cycle',
    'Can','Possible Unhandled Promise','Animated: ','ProgressBarAndroid','Setting a timer']);

const store = storeConfig();

const Redux = () => {
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Redux);
