import React, { Component } from 'react';
import { View, TouchableHighlight, Image, TextInput, ListView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { modificaMensagem, enviaMensagem, conversaUsuarioFetch } from '../actions/AppActions';

class Conversa extends Component {

    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
        this.criaFonteDeDados(this.props.conversa);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.contatoEmail != nextProps.contatoEmail){
            this.props.conversaUsuarioFetch(nextProps.contatoEmail);
            
        }
        this.criaFonteDeDados(nextProps.conversa);
    }

     _enviaMensagem(){
                 //var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        const moment = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;

        const mensagem = this.props.mensagem;
        const contatoNome = this.props.contatoNome;
        const contatoEmail = this.props.contatoEmail;

        this.props.enviaMensagem(mensagem, contatoNome, contatoEmail, moment)
    } 

    criaFonteDeDados( conversa ){
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.fonteDeDados = ds.cloneWithRows(conversa);
    }

    renderRow(texto) {

        if(texto.tipo === 'e'){
            return (
                <View style={{alignItems: 'flex-end', marginTop: 5, marginBottom: 5, marginLeft: 40}}>
                    <Text style={{fontSize: 18, padding: 10, color: '#000', backgroundColor: '#f7f7f7', elevation: 1 }}>{texto.mensagem}</Text>
                    <Text style={{ fontSize: 11, paddingLeft: 10, paddingRight: 10, paddingBottom: 2, color: 'lightgrey', fontWeight: '800', backgroundColor: '#f7f7f7', elevation: 1, alignSelf: 'flex-end' }}>{texto.moment}</Text>
                </View>
            )
        }

        return (
            <View style={{alignItems: 'flex-start', marginTop: 5, marginBottom: 5, marginRight: 40}}>
                <Text style={{fontSize: 18, padding: 10, color: '#000', backgroundColor: '#dbf5b4', elevation: 1 }}>{texto.mensagem}</Text>
                <Text style={{ fontSize: 11, paddingLeft: 10, paddingRight: 10, paddingBottom: 2, color: 'lightgrey', fontWeight: '800', backgroundColor: '#dbf5b4', elevation: 1, alignSelf: 'flex-start' }}>{texto.moment}</Text>
            </View>
        )
    }

    render() {
        return(
            <View style={{flex: 1, marginTop: 50, backgroundColor: "#eee4dc", padding: 10}}>
                <View style={{flex: 1, paddingBottom: 20}}>

                    <ListView
                        enableEmptySections
                        dataSource={this.fonteDeDados}
                        renderRow={data => this.renderRow(data)}
                    />

                </View>

                <View style={{flexDirection: 'row', height: 60, justifyContent: 'center', alignItems: 'center'}}>
                    <TextInput 
                        value={this.props.mensagem}
                        onChangeText={ texto => this.props.modificaMensagem(texto) }
                        style={{flex: 4,backgroundColor: "#fff", fontSize: 18, height: 60}}
                    />

                
                    <TouchableOpacity
                        onPress={ () => this._enviaMensagem()  }
                    >
                        <Image style={{height: 60, width: 65}} source={require('../imgs/envia.png')} />
                    </TouchableOpacity>
                </View>
               
            </View>
        )
    }
}

mapStateToProps = state => {

    const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return ({ ...val, uid })
    })

    return {
        conversa: conversa,
        mensagem: state.AppReducer.mensagem
    }
}

export default connect(mapStateToProps, { modificaMensagem, enviaMensagem, conversaUsuarioFetch })(Conversa);