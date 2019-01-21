import React from 'react';
import { View, Text, Button,Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

const imagem = require('../imgs/bg.png');

export default props => (
 <Image style={{flex:1, width: null}} source={imagem}>
    <View style={{flex: 1, padding: 15}} >
        <View style={{flex: 2, justifyContent:'center', alignItems: 'center'}} >
            <Text style={{fontSize: 30, color: '#fff'}} >Seja bem-vindo!</Text>
            <Image source={require('../imgs/opened.png')} />
        </View>

        <View style={{flex: 1}} >
            <Button title="Fazer Login" color='green' onPress={() => Actions.formLogin() } />
        </View>
    </View>
 </Image>
);