import React,{Component} from 'react';
import {SafeAreaView,View,Text,StyleSheet, ImageBackground, ScrollView, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {ButtonGroup, Button, Header, ListItem} from 'react-native-elements';

const IMAGE_CORTE = require('../../../assets/images/home_corte.png');
const IMAGE_LEITE = require('../../../assets/images/home_leite.png');

const valorClient = {
    
}

const Home = class extends Component{

    state = {
        orientation: '',
        selectedIndex: 0
    }

    constructor(props){
        super(props);
        this.state = {
            ... this.state
        }
    }

    _onClickedTop = (index) => {
        this.setState({
            ... this.state,
            selectedIndex: index
        });
        this.viewpager.setPage(index);
    }

    _onChangePageView = (value) => {
        let index = value.nativeEvent.position ;
        this.setState({
            ... this.state,
            selectedIndex: index
        });
    }

    render(){

        if (this.props.orientation !== 'LANDSCAPE') {
            var styles = styles_p;
            return(
                <SafeAreaView style={styles.container}>

                    <Header 
                        containerStyle={{backgroundColor: '#508977'}}
                        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer() }}
                        centerComponent={{ text: 'Campo Gestão', style: { color: '#fff', fontSize: 20, fontWeight: 'bold' } }}
                     />

                                                
                </SafeAreaView>
            )
        } else {
            var styles = styles_l;
            return(
                <SafeAreaView style={styles.container}>
                    
                </SafeAreaView>
            )
        }
        
    }
}

const styles_l = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const styles_p = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    viewpager: {
        flex: 1,
        width: '100%',
        height: '88%'
    },
    containerTop: {
        marginTop: 5,
        alignSelf: 'flex-start', 
        width: '100%', 
        height: '12%', 
        backgroundColor: '#508977',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    containerButtonTop: {
        height: '8%',
        width: '90%',
        backgroundColor: '#7bb968',
        position: 'absolute',
        top: '11%',
        borderRadius: 5,
        borderWidth: 0
    },
    containerBox: {
        flex: 1,
        padding: 10,
        backgroundColor: '#eee',
        alignItems: 'center'
    },
    buttonAction: {
        backgroundColor: '#205947'
    },
    containerButtonAction: {
        width: '70%',
        borderRadius: 5,
        marginTop: '10%',
    }
})


const mapStateToProps = ({ load, position, user }) => {
  return {
      orientation: load.orientation,
      user: user
  }
}

export default connect(mapStateToProps,null)(Home);