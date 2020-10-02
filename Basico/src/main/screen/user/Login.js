import React, {Component} from 'react';
import {SafeAreaView, 
    View, 
    StyleSheet,
    Image} from 'react-native';
import {connect} from 'react-redux';

const LOGO_CAMPO = require('../../../../assets/images/logo.png');

const Login = class extends Component {

    state = {
        user_cpf : '',
        user_pass : '',
        modal_show: false,
        modal_msg: '',
        loading: false
    }
    constructor(props){
    }
    

    render(){
        if (this.props.orientation !== 'LANDSCAPE') {
            var styles = styles_p;
            return(
                <SafeAreaView style={styles.container}>
                
                </SafeAreaView>
            );
        } else {
            var styles = styles_l;
            return(
                <SafeAreaView style={styles.container}>
                    
                </SafeAreaView>
            );
        }
    }
}


const styles_l = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerBox: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#508977',
    },
    containerImage: {
        width: 150,
        height: 74,
        position: 'absolute',
        top: '05%'
    },
    containerInputLogin: {
        borderRadius: 25,
        width: '60%',
        height: 50,
        backgroundColor: '#7bb968',
        marginBottom: 10
    },
    containerButton: {
        borderRadius: 25,
        padding: 10,
        width: '30%'
    },
    textInfo: {
        fontSize: 15,
        textAlign: 'center',
    },
    textLabel: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#999'
    },
    inputText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20
    }
})

const styles_p = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerBox: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#508977',
    },
    containerImage: {
        width: 150,
        height: 74,
        position: 'absolute',
        top: '20%'
    },
    containerInputLogin: {
        borderRadius: 25,
        width: '80%',
        height: 50,
        backgroundColor: '#7bb968',
        marginBottom: 20
    },
    containerButton: {
        borderRadius: 25,
        padding: 10,
        width: '50%'
    },
    textInfo: {
        fontSize: 15,
        textAlign: 'center',
    },
    textLabel: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#999'
    },
    inputText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20
    }
})

const mapStateToProps = ({ load, user }) => {
    return {
        orientation: load.orientation
    }
}


export default connect(mapStateToProps, null)(Login);