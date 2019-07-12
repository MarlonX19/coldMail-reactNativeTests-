import { MODIFICA_ADICIONA_CONTATO_EMAIL,
     ADICIONA_CONTATO_ERRO,
      ADICIONA_CONTATO_SUCESSO,
       LISTA_CONTATO_USUARIO,
       MODIFICA_MENSAGEM,
       LISTA_CONVERSA_USUARIO,
       ENVIA_MENSAGEM_SUCESSO,
       LISTA_CONVERSAS_USUARIO
     } from './types';

import b64 from 'base-64';
import firebase from 'firebase';
import _ from 'lodash';

export const modificaAdicionarContatoEmail = (texto) => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: texto
    }
}

export const adicionaContato = email => {
    return dispatch => {

        let emailB64 = b64.encode(email);

            firebase.database().ref(`/contatos/${emailB64}`)
                .once('value')
                .then(snapshot => {
                    if(snapshot.val()) {
                        const dadosUsuario = _.first(_.values(snapshot.val()));

                        const { currentUser } = firebase.auth();
                        let emailUsuarioB64 = b64.encode(currentUser.email);

                        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                            .push({ email: email, nome: dadosUsuario.nome })
                            .then(() => adicionaContatoSucesso(dispatch))
                            .catch(erro => adicionaContatoErro(erro.message, dispatch))

                    } else {
                        dispatch ({ type: ADICIONA_CONTATO_ERRO, payload: 'Usuário não existe' })
                    }
                })
    }
}

const adicionaContatoErro = (erro, dispatch) => {
    dispatch(
        {
            type: ADICIONA_CONTATO_ERRO,
            payload: erro
        }
    )
}

const adicionaContatoSucesso = (dispatch) => {
    dispatch (
        {
            type: ADICIONA_CONTATO_SUCESSO,
            payload: true

        }
    )
}

export const habilitaInclusaoContato = () => (
    {
        type: ADICIONA_CONTATO_SUCESSO,
        payload: false
    }
)


export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() })
            })
    }
}


export const modificaMensagem = (texto) => {
    return ({
        type: MODIFICA_MENSAGEM,
        payload: texto
    })
}

export const enviaMensagem = (mensagem, contatoNome, contatoEmail, moment) => {

        // Dados dousuario logado
        const { currentUser } = firebase.auth();
        const usuarioEmail = currentUser.email;

    
    return (dispatch) => {
        // Dados do contato


        // convertendo para base 64
        const usuarioEmailB64 = b64.encode(usuarioEmail);
        const contatoEmailB64 = b64.encode(contatoEmail);

        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({ mensagem: mensagem, tipo: 'e', moment: moment })
            .then(() => {
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    .push({ mensagem: mensagem, tipo: 'r', moment: moment })
                    .then(() => dispatch ({ type: ENVIA_MENSAGEM_SUCESSO }) )
            })
            .then(() => { //Armazena cabecalho de conversas do usuario logado
                firebase.database().ref(`usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    .set({ nome: contatoNome, email: contatoEmail })
            })    
            .then(() => { //Armazena cabecalho de conversas do contato

                firebase.database().ref(`/contatos/${usuarioEmailB64}/`)
                    .once("value")
                    .then(snapshot => {
                        
                        const dadosUsuario = _.first(_.values(snapshot.val()))

                        firebase.database().ref(`usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                            .set({ nome: dadosUsuario.nome, email: usuarioEmail })

                    })
            })
    }

}

export const conversaUsuarioFetch = (contatoEmail) => {

    const { currentUser } = firebase.auth();

    let usuarioEmailB64 =  b64.encode(currentUser.email);
    let contatoEmailB64 = b64.encode(contatoEmail);

    return (dispatch) => {
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONVERSA_USUARIO, payload: snapshot.val() })
            })

    }

}

export const conversasUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        let usuarioEmailB64 = b64.encode(currentUser.email);

        firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONVERSAS_USUARIO, payload: snapshot.val() })
            })
    }

}







