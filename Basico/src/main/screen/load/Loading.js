import React from 'react';
import {SafeAreaView} from 'react-native';
import LottieView from 'lottie-react-native';
import { loadPartialConfig } from '@babel/core';

const ANIMATION_SOURCE = require('../../../../assets/animation/load-rappi.json');

export default Loading = (props) => {
    return(
        <SafeAreaView>
            <LottieView source={ANIMATION_SOURCE} autoPlay loop />
        </SafeAreaView>
    )
}