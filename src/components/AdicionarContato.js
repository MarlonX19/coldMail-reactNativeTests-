import React, { Component } from 'react';
import { View, TextInput, Button, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { modificaAdicionarContatoEmail, adicionaContato } from '../actions/AppActions';

class AdicionarContato extends Component {

    renderAdicionarContato(){
        if(!this.props.cadastro_resultado_inclusao){
            return (
                <View style={{flex: 2, marginTop: 70}}>
                <View style={{flex: 1}}>
                   <View style={{flex:1, alignItems: 'center'}}>
                    <Image style={{height: 90, width: 90,}} source={require('../imgs/addUser.png')} />
                   </View>
                    <TextInput
                        placeholder='E-mail'
                        style={{fontSize: 20, height: 45}}
                        onChangeText={(texto) => this.props.modificaAdicionarContatoEmail(texto)}
                        value={this.props.adiciona_contato_email}
                    />
                </View>

                <View style={{flex:1}}>
                    <Button title="Adicionar"
                    color="#115E54"
                    onPress={() => this.props.adicionaContato(this.props.adiciona_contato_email)} 
                    />
                    <Text style={{color: 'red', fontSize: 20}}>
                        {this.props.cadastro_resultado_txt_erro}
                    </Text>
                </View>
                </View>
            )

        } else {
            return (
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 30, justifyContent: 'center', alignItems: 'center'}}>CADASTRO REALIZADO!</Text>
                    <Image style={{height: 40, width: 40}} source={require('../imgs/checked.png')} />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{flex:1, justifyContent: 'center', padding: 30 }}>
                {this.renderAdicionarContato()}
            </View>
        )
    }
}

const mapStateToProps = state => (
  {
    adiciona_contato_email: state.AppReducer.adicionar_contato_email,
    cadastro_resultado_txt_erro: state.AppReducer.cadastro_resultado_txt_erro,
    cadastro_resultado_inclusao: state.AppReducer.cadastro_resultado_inclusao
  }
)

export default connect(mapStateToProps, { modificaAdicionarContatoEmail, adicionaContato })(AdicionarContato)