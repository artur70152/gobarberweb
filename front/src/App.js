import React from "react";
import {ToastContainer} from'react-toastify'
import {PersistGate} from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import {BrowserRouter as Router} from 'react-router-dom'
import Global from "./styles/global";

import './config/reactotronconfig'

import Routesa from "./routes";
import {store,persistor} from "./store/index";
function App(){
    
return (
<>
<Provider store={store} >
<PersistGate persistor={persistor}>
<Router >
<Global/>
<ToastContainer autoClose={3000}/>
<Routesa/>
</Router>
</PersistGate>
</Provider>
</>
)
}


export default App;
