import React, { Component } from 'react';
import { View, TextInput, Button, Image, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario } from '../actions/AutenticacaoActions';

const imagem = require('../imgs/bg.png');

class formCadastro extends Component {

    _cadastraUsuario() {

        const nome = this.props.nome;
        const email = this.props.email;
        const senha = this.props.senha;

        this.props.cadastraUsuario({ nome, email, senha });
    }

    renderBtnCadastro() {

        if(this.props.loading_cadastro)
        return(
            <ActivityIndicator size="large" />
        ) 

        return (
            <Button title="Cadastrar" color="#115E54" onPress={() => this._cadastraUsuario()} />
        )
    }

render() {
    return (
        <Image style={{flex:1, width: null}} source={imagem}>
          <View style={{flex: 1, padding: 10}}>
              <View style={{flex: 4, justifyContent: 'center'}}>
                  <TextInput value={this.props.nome}
                   placeholder="Nome"
                    placeholderTextColor="#fff"
                     style={{fontSize: 20, height: 45}}
                      onChangeText={(texto) => this.props.modificaNome(texto)} 
                    />

                  <TextInput value={this.props.email}
                   placeholder="E-mail"
                    placeholderTextColor="#fff"
                     style={{fontSize: 20, height: 45}}
                      onChangeText={(texto) => this.props.modificaEmail(texto)} 
                    />

                  <TextInput secureTextEntry={true}
                   value={this.props.senha}
                    placeholder="Senha"
                     placeholderTextColor="#fff"
                      style={{fontSize: 20, height: 45}}
                       onChangeText={(texto) => this.props.modificaSenha(texto)}
                    />

                    <Text style={{color: 'red', fontSize: 20 }}>{this.props.erroCadastro}</Text>

              </View>
      
              <View style={{flex: 1}}>
                  {this.renderBtnCadastro()}
              </View>
          </View>
        </Image>
      );
    }
}

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        loading_cadastro: state.AutenticacaoReducer.loading_cadastro
    }
)

export default connect(
    mapStateToProps,
     { 

       modificaEmail,
       modificaSenha,
       modificaNome,
       cadastraUsuario

      }
         
)(formCadastro);
