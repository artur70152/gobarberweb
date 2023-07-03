import { takeLatest, call, put, all } from 'redux-saga/effects'
import api from '../../services/api';

import { Updateprofilesuccess } from './actions';

export function* updateProfile( payload ){

const {name,email, ...rest}=payload.data;

console.log(payload)

const profile=Object.assign(
    {name,email},
    rest.Oldpassword ? rest :{}
)

const response= yield call(api.put, 'users', profile)


yield put(Updateprofilesuccess(response.data)) 
console.log('aaa')
}
 
export default all([
takeLatest('@user/UPDATE_PROFILE_REQUEST',updateProfile)


])