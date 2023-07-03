import {produce} from 'immer';

const INITIAL_STATE={
profile:null,

}

export default function user(state=INITIAL_STATE,action){
   
    return produce(state,draft=>{
    switch(action.type){
    case '@user/SIGN_IN_SUCCESS':{
        console.log('success')
        draft.profile=action.payloade.user;
        console.log('success')
        break;
    } 
    case'@user/UPDATE_PROFILE_SUCCESS':{
   
        draft.profile=action.payload.profile;
        break;
    }
   
   
}
      })}
