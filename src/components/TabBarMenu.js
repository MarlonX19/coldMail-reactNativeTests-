import React from 'react';
import { View, Text, StatusBar, Image, TouchableHighlight } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { habilitaInclusaoContato, sairApp } from '../actions/AppActions';


const TabBarMenu = props => (
        <View style={{backgroundColor: "#115E54", elevation: 4, marginBottom: 10}}>

            <StatusBar backgroundColor= "#114D44" />

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'center', height: 50}}>
                <Text style={{ color: "#fff", marginLeft: 20, fontSize: 20}}>Cold Mail</Text>
            </View>

            <View style={{ flexDirection: 'row', marginRight: 20 }}>
                <View style={{width: 50, justifyContent: 'center' }}>
                 <TouchableHighlight
                    onPress={() => {Actions.adicionarContato(); props.habilitaInclusaoContato()} }
                    underlayColor= "green"
                 >
                    <Image source={require('../imgs/adicionar-contato.png')} />
                 </TouchableHighlight>
                </View>

                <View style={{ justifyContent: 'center' }}>
                    <TouchableHighlight
                        onPress={ () => props.sairApp() }
                    >
                    <Text style={{ fontSize: 20, color: "#fff" }}>Sair</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>

            <TabBar { ...props } style={{ backgroundColor: "#115E54", elevation: 0 }} />
        </View>
);

export default connect(null, { habilitaInclusaoContato, sairApp })(TabBarMenu);