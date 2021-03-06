import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';
import {
    MODIFICA_NOME,
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    LOGIN_USUARIO_SUCESSO,
    LOGIN_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO
} from './types';

import { AsyncStorage } from 'react-native';

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: MODIFICA_NOME,
        payload: texto
    }
}

export const cadastraUsuario = ({ nome, email, senha }) => {
    return dispatch => {

        dispatch({ type: CADASTRO_EM_ANDAMENTO })

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailB64 = b64.encode(email);

                firebase.database().ref(`/contatos/${emailB64}`)
                    .push({ nome: nome })
                    .then(value => cadastraUsuarioSucesso(dispatch))

            })
            .catch(erro => cadastraUsuarioErro(erro, dispatch))
    }
}


const cadastraUsuarioSucesso = (dispatch) => {
    dispatch({ type: CADASTRO_USUARIO_SUCESSO });

    Actions.boasVindas();
}

const cadastraUsuarioErro = (erro, dispatch) => {
    /* var erros = 'Há erros nos dados informados';
 
     if(erro.message == 'The email address is already in use by another account.'){
         erros = 'O e-mail informado já está sendo usado por outro usuário';
     } */

    dispatch({ type: CADASTRO_USUARIO_ERRO, payload: erro.message });
}

export const autenticarUsuario = ({ email, senha }) => {
    return dispatch => {

        dispatch({ type: LOGIN_EM_ANDAMENTO })

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => loginUsuarioSucesso(dispatch, email))
            .catch(erro => loginUsuarioErro(erro, dispatch));
    }

}

export const jaLogado = (usermail) => {
    console.log(usermail)
    return {
        type: LOGIN_USUARIO_SUCESSO,
        payload: usermail
    };
}

const loginUsuarioSucesso = (dispatch, email) => {
    try {
        AsyncStorage.setItem('usermail', email)
    } catch (error) {
        // Error saving data
    }
    dispatch(
        {
            type: LOGIN_USUARIO_SUCESSO,
            payload: email
        }
    );

    Actions.principal();
}


const loginUsuarioErro = (erro, dispatch) => {
    dispatch(
        {
            type: LOGIN_USUARIO_ERRO,
            payload: erro.message
        }
    );
}