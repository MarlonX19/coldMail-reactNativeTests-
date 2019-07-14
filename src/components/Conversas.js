import React, { Component } from 'react';
import { View, Text, ListView,TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { conversasUsuarioFetch } from '../actions/AppActions';

class Conversas extends Component {

    componentWillMount() {
        this.props.conversasUsuarioFetch(this.props.usermail);
        this.criaFonteDeDados(this.props.conversas);
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados(nextProps.conversas);
    }

    criaFonteDeDados( conversas ){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

        this.dataSource = ds.cloneWithRows( conversas );
    }

    renderRow( conversa ) {
        return (
            <TouchableOpacity
                onPress={() => Actions.conversa({ title: conversa.nome, contatoNome: conversa.nome, contatoEmail: conversa.email }) }
            >

            <View style={{flexDirection: 'row', padding: 20, borderBottomWidth: 1, borderColor: '#ccc', justifyContent: 'space-between'}}>
                <View>
                    <Text style={{fontSize: 25}} >{conversa.nome}</Text>
                </View>
                <Image style={{height: 70, width: 70}} source={require('../imgs/chat.png')} />
            </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={(data) => this.renderRow(data)}
            />
        )
    }
    
}

mapStateToProps = state => {
    const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
        return { ...val, uid}
    });

    return {
        conversas: conversas,
        usermail: state.AutenticacaoReducer.usermail
    }
}

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas);