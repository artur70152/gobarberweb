import React from "react";
import { useDispatch,useSelector } from "react-redux";

import {Link} from "react-router-dom";
import logo from '../../../src/logo.svg'
import {Form, Input} from '@rocketseat/unform'
import {store} from '../../store/index'
import * as Yup from 'yup';
import AuthLayout from "../_layouts/auth";
import { signinRequest } from "../../store/modules/auth/actions";

const schema=Yup.object().shape({
email:Yup.string()
.email('insira email valido').required('o email é obrigatorio'),
password: Yup.string().required('A senha é obrigatoria'),


})


export default function Singin(){
const loading=store.getState().auth.loading
    const dispatch=useDispatch()
    function handleSubmit({email,password}){
dispatch(signinRequest(email,password))
    }


    return(
        <>
     
        <img src={logo} alt='Gobarber' width={100} height={100}/>
    <Form schema={schema} onSubmit={handleSubmit}>
<Input name="email" type='email' placeholder="seu email"/>
<Input name="password" type='password' placeholder="sua senha"/>
<button type="submit">{loading? 'Carregando...':'Acessar'}</button>
<Link to='/register'>criar uma conta</Link>

    </Form>
    
        </>
        
    )
}