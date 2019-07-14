import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableHighlight, Image, ActivityIndicator, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario, jaLogado } from '../actions/AutenticacaoActions';
import { contatosUsuarioFetch } from '../actions/AppActions';

const imagem = require('../imgs/bg.png');

class formLogin extends Component {


    componentDidMount(){
        this._retrieveData();
    }

    async _retrieveData(){
        try {
          const value = await AsyncStorage.getItem('usermail');
          console.log(value);
          if (value !== null) {
            // We have data!!
            console.log(value);
            this.props.jaLogado(value);
            Actions.principal();
          }
        } catch (error) {
          // Error retrieving data
          console.log(error);
        }
      };

    _autenticarUsuario() {
        //const { email, senha } = this.props;

        const email = this.props.email;
        const senha = this.props.senha;

        this.props.autenticarUsuario({ email, senha });

    }

    renderBtnAcessar() {

        if (this.props.loading_login) {
            return (
                <ActivityIndicator size='large' />
            )

        }

        return (
            <Button title="Acessar" color="#115E54" onPress={() => this._autenticarUsuario()} ></Button>
        )
    }


    render() {
        return (
            <Image style={{ flex: 1, width: null }} source={imagem}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 35, color: "#fff" }}>Cold Mail</Text>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ height: 90, width: 90 }} source={require('../imgs/login.png')} />
                    </View>

                    <View style={{ flex: 2 }}>
                        <TextInput
                            value={this.props.email}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder='E-mail'
                            placeholderTextColor="#fff"
                            onChangeText={texto => this.props.modificaEmail(texto)}
                        />

                        <TextInput
                            secureTextEntry={true}
                            value={this.props.senha}
                            style={{ fontSize: 20, height: 45 }}
                            placeholder='Senha'
                            placeholderTextColor="#fff"
                            onChangeText={texto => this.props.modificaSenha(texto)}
                        />

                        <Text style={{ color: "red", fontSize: 20 }} >{this.props.erroLogin}</Text>

                        <TouchableHighlight onPress={() => Actions.formCadastro()}>
                            <Text style={{ fontSize: 20, color: "#fff" }} >Ainda nao tem cadastro? Cadastre-se</Text>
                        </TouchableHighlight>

                    </View>

                    <View style={{ flex: 2 }}>
                        {this.renderBtnAcessar()}
                    </View>
                </View>
            </Image>
        );
    }
}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loading_login: state.AutenticacaoReducer.loading_login
    }

)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario, contatosUsuarioFetch, jaLogado })(formLogin);