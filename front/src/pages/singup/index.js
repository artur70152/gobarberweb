import React from "react";
import { useDispatch } from "react-redux";
import { signUpRequest } from "../../store/modules/auth/actions";
import {Link} from "react-router-dom";
import logo from '../../../src/logo.svg'
import {Form, Input} from '@rocketseat/unform'
import * as Yup from 'yup';
const schema=Yup.object().shape({
    name:Yup.string().required('o nome é obrigatorio'),
email:Yup.string().email('insira email valido').required('o email é obrigatorio'),
password: Yup.string().min(6, 'no minimo 6 caracteres').required('A senha é obrigatoria'),


})
export default function Singup(){
    const dispatch=useDispatch()
function handleSubmit({name,email,password}){
dispatch(signUpRequest(name,email,password))

}
    return(
        <>
        <img src={logo} alt='Gobarber' width={100} height={100}/>
    <Form schema={schema} onSubmit={handleSubmit}>
    <Input name="name" placeholder="nome completo"/>

<Input name="email" type='email' placeholder="seu email"/>
<Input name="password" type='password' placeholder="sua senha"/>
<button type="submit">Criar conta</button>
<Link to='/'>Ja tenho login</Link>

    </Form>
        </>
        
    )
}