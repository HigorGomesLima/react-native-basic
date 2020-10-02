/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import Orientation from 'react-native-orientation';
import Navigation from './src/main/router/Navigation';
import {connect} from 'react-redux';
import {YellowBox} from 'react-native';
import {setOrientation} from './src/main/store/actions/load';

//Remoção de alertas medianos
YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps has been renamed',
  'Failed prop type: Invalid prop']);

//Classe principal do aplicativo
const App = class extends Component {
  constructor(props){
    super(props);
    this.props.onSetOrientation(Orientation.getInitialOrientation());
  }

  async componentDidMount(props,state){
    Orientation.addOrientationListener(this._orientationDidChange);

    var locationRequest = await this._checkPermission();

    if (locationRequest){
      this._positionDidChange();
    }
  }

  _orientationDidChange = (orientation) => {
    this.props.onSetOrientation(orientation);
  }

  render(){
    return(
      <Navigation />
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
      onSetOrientation: (value) => dispatch(setOrientation(value)),
  }
}

export default connect(null,mapDispatchToProps)(App);
