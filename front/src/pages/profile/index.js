import React from "react";
import {Form,Input}from '@rocketseat/unform'
import { useSelector,useDispatch } from "react-redux";
import { Container } from "./styles";
import { Updateprofilerequest } from "../../store/user/actions";
import { signOut } from "../../store/modules/auth/actions";
import Avatarinput from "./avatarinput";
import api from "../../services/api";


export default function Profile(){
    const dispatch=useDispatch();
const profile=useSelector(state=>state.user.profile)
function handleSubmit(data){
    console.log('index')
dispatch(Updateprofilerequest(data))
}

function handleSignOut(){
    const token=localStorage.getItem('token');
    console.log(token)
    api.defaults.headers.Authorization=`Bearer ${token}`
    dispatch(signOut())
    }

    return(
        <Container>
<Form initialData={profile} onSubmit={handleSubmit}>
    <Avatarinput  name="avatar_id" />
<Input name="name" placeholder="nome completo"/>
<Input name="email" placeholder="seu email"/>
<hr/>
<Input type="password" name="oldPassword" placeholder="sua senha antiga"/>
<Input type="password" name="password" placeholder="nova senha"/>
<Input type="password" name="confirmPassword" placeholder="confirmação de senha"/>
<button type="submit" >atualizar perfil</button>
<button type="button" className="aa" onClick={handleSignOut}>sair do gobarber</button>

</Form>

        </Container>
    
    )
}