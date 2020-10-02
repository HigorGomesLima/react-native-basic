import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import LottieView from 'lottie-react-native';

const ANIMATION_LOAD = require('../../../../assets/animation/load_gears.json');

const Load = class extends Component{

    state = {
        conclued: 0,
        msg: ''
    }

    constructor(props){
        super(props);
    }

    render(){
        if (this.props.orientation !== 'LANDSCAPE') {
            var styles = styles_p;
            return(
                <SafeAreaView style={styles.container}>
                    <LottieView source={ANIMATION_LOAD} autoPlay loop />
                    <Text style={styles.textInfo}>
                        {`Carregando os registros ${this.state.conclued} %`} 
                    </Text>
                    <Text style={styles.textInfo}>
                        {this.state.msg} 
                    </Text>
                </SafeAreaView>
            );
        } else {
            var styles = styles_l;
            return(
                <SafeAreaView style={styles.container}>
                    <LottieView source={ANIMATION_LOAD} autoPlay loop />
                    <Text style={styles.textInfo}>
                        {`Carregando os registros ${this.state.conclued} %`} 
                    </Text>
                </SafeAreaView>
            );
        }
    }
}

const styles_l = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewpager: {
        flex: 9
    },
    containerButtonPages: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    containerBox: {
        flex: 1,
        padding: 10
    },
    containerCheck: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerButton: {
        position: 'relative'
    },
    buttonDefault: {
        borderRadius: 25,
        width: 40,
        height: 40,
    },
    textInfo: {
        marginTop: '10%',
        fontSize: 20,
        textAlign: 'center',
    },
    textLabel: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#999'
    }
})

const styles_p = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewpager: {
        flex: 8,
        padding: 10
    },
    containerButtonPages: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    containerBox: {
        flex: 1,
        padding: 10
    },
    containerCheck: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerButton: {
        position: 'relative'
    },
    buttonDefault: {
        borderRadius: 25,
        width: 40,
        height: 40,
    },
    textInfo: {
        marginTop: '10%',
        fontSize: 20,
        textAlign: 'center',
    },
    textLabel: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#999'
    }
})

const mapStateToProps = ({ load, user }) => {
    return {
        orientation: load.orientation
    }
}

export default connect(mapStateToProps, null)(Load);