import React, {Component, memo} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {SaveLoad} from '../../persistence/database';
import {Button} from 'react-native-elements';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome5';

const DrawerCustomClass = class extends Component {

    constructor(props){
        super(props);
    }

    _logout = async() => {

        var save_load = await SaveLoad({cpf: "", senha: "", unidade: ""});
        this.props.navigation.navigate('Login');

    }

    _handler = (route) => {
        this.props.navigation.navigate(route);
    }

    render(){
        if (this.props.orientation !== 'LANDSCAPE') {
            var styles = styles_p;
            return(
                <DrawerContentScrollView style={styles.container}>
                    <View style={{height: 120, width: '100%', alignItems: 'center', justifyContent: 'space-around'}}>
                        <Icon name='user' size={20} />
                        <Text>{this.props.user.nome}</Text>
                        <Icon name={this.props.user.unidade === 'leite' ? 'beer' : 'store'} size={15}/>
                        <Text>{this.props.user.unidade === 'leite' ? 'Leite' : 'Corte'}</Text>
                    </View>
                    <MenuItem icon='home' title='Menu' onPress={() => this.props.navigation.navigate('Principal')}/>
                    <MenuItem icon='file-alt' title='Registro Visita' onPress={() => this.props.navigation.navigate('Visit')}/>
                    <MenuItem icon='user' title='Registro Cliente' onPress={() => this.props.navigation.navigate('Client')}/>
                    <MenuItem icon='tractor' title='Registro Fazenda' onPress={() => this.props.navigation.navigate('Farm')}/>
                    <MenuItem icon='sign-out-alt' title='Sair' onPress={() => this._logout()}/>
                </DrawerContentScrollView>
            )
        } else {
            var styles = styles_l;
            return(
                <DrawerContentScrollView style={styles.container}>
                    
                </DrawerContentScrollView>
            )
        }
    }
}

const MenuItem = (props) => {
    return(
        <DrawerItem
            label={props.title}
            onPress={() => props.onPress()}
            icon={ ({ focused, color, size }) => 
                <Icon name={props.icon} size={15} />
            } />
    )
}

const styles_l = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const styles_p = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const mapStateToProps = ({ load, user }) => {
    return {
        orientation: load.orientation,
        user: user
    }
  }

export default connect(mapStateToProps, null)(memo(DrawerCustomClass));