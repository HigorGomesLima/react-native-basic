import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../screen/Home';
import Load from '../screen/load/Load';
import Login from '../screen/user/Login';

import DrawerCustom from '../component/menu/DrawerCustom';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Navigation = class extends Component {

    constructor(props){
        super(props);
    }

    homeScreen = (props) => {
        return(
            <Drawer.Navigator drawerContent={() => <DrawerCustom { ... props}/>} initialRouteName='VisitSearch'>
                <Drawer.Screen name='Principal' component={Home} />
            </Drawer.Navigator>
        )
    }

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Load' >
                    <Stack.Screen name='Load' component={Load} options={{ headerShown: false}}/>
                    <Stack.Screen name='Login' component={Login} options={{ headerShown: false}}/>
                    <Stack.Screen name='Main' component={this.homeScreen} options={{ headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const mapStateToProps = ({ load }) => {
    return {
        orientation: load.orientation
    }
  }

export default connect(mapStateToProps,null)(Navigation);