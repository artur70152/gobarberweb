import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '../../../services/api';
import {toast} from 'react-toastify'
import { signFailure, signinSuccess } from './actions';
import history from '../../../services/history';
import { Updateprofilesuccess } from '../../user/actions';
import { useEffect } from 'react';
import { store } from '../../index';

export  function* Singin({ payload }) {

  const { email, password } = payload;
  console.log(payload)
  const response = yield call(api.post, 'sessions', {
    name:'artur',
    email,
    password,
    
  });

  console.log(response)
  

  const { token, user } = response.data;
  
  if (!user.provider) {
  toast.error('usuário não é prestador');
    return;
  }

 

console.log(api.defaults.headers)

  yield put(signinSuccess(token, user));
 
  history.push('/dashboard');
  history.go('/dashboard');
  localStorage.setItem("token",token);


toast.error('falha na autenticacao')
  yield put(signFailure());



}
export function* Signupd({payload}){
 
  try{
console.log(payload)
const{name,email,password}=payload
const responsea=yield call(api.post, 'users',{
name,
email,
password,

})
console.log(responsea)
history.push('/');
history.go('/');

//createRoot(document.getElementById('root')).render()
  }catch(err){
    toast.error('falha no cadastro, verifique seus dados')
    yield put(signFailure())
  }
}
export function signOut(){
  history.push('/')
  history.go('/')
}
export function setToken({payload}){
if(!payload) return;
const{token}=payload.auth;
if(token){
  api.defaults.headers.Authorization=`Bearer ${token}`
}

}
export function* updateProfile( payload ){
//console.log(payload.type)
  const {name,email, ...rest}=payload;
  
  //console.log(payload.payload.data)
  
  const profile=Object.assign(
      {name:payload.payload.data.name,email:payload.payload.data.email,},
      payload.payload.data.oldpassword ? payload.payload.data :{}
  )
  console.log(profile)
  const response= yield call(api.put, 'users', profile)
  console.log(response.data)
  
  yield put(Updateprofilesuccess(response.data)) 
  console.log(payload.payload.data.name)
  console.log(response.data)
  }
   
  


export default all([
takeLatest('persist/REHYDRATE',setToken),
takeLatest('@auth/SIGN_IN_REQUEST', Singin),
takeLatest('@auth/SIGN_UP_REQUEST', Signupd),
takeLatest('@auth/SIGN_OUT', signOut),
takeLatest('@user/UPDATE_PROFILE_REQUEST',updateProfile),


]);