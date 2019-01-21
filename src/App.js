import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers/index';


class App extends Component {

    componentWillMount() {
        // Initialize Firebase
            var config = {
                apiKey: "AIzaSyAVzTiLWYXqPGB-TRSvl67vd7XL9FyLaYc",
                authDomain: "greenapp-9a3e8.firebaseapp.com",
                databaseURL: "https://greenapp-9a3e8.firebaseio.com",
                projectId: "greenapp-9a3e8",
                storageBucket: "greenapp-9a3e8.appspot.com",
                messagingSenderId: "73079053095"
            };
            firebase.initializeApp(config);

            console.disableYellowBox = true;  
    }

render() {
 return(
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))} >
        <Routes />
    </Provider>
  );
 }
}

export default App;