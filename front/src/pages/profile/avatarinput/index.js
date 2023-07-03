import React,{useState,useRef,useEffect} from 'react';
import { useField } from '@rocketseat/unform';
import { useSelector } from "react-redux";

import { Container } from '../styles';
import logo from "../../../logo.svg"
import api from '../../../services/api';
export default function Avatarinput(){
    const {defaultValue,registerField}=useField('avatar')

    const [file,setfile]=useState(defaultValue && defaultValue._id);

    const [preview,setpreview]=useState(defaultValue && defaultValue.url);

const ref=useRef();
useEffect(()=>{
if(ref.current){
registerField({
    name:'avatar_id',
    ref:ref.current,
    path:'dataset.file',
})

}
},[ref,registerField])

   async function handleChange(e){
    console.log('aa')
const data = new FormData();

data.append('file',e.target.files[0])
    const response = await api.post('files',data )  
    console.log (response.data.id)
    const {id,url }=response.data 
    setfile(id)
    setpreview(url)
 await api.put('users',{avatar_id:response.data.id} )  




    }
    
return(
    <Container>
        <div id="af">
<label htmlFor=''>
<img src={preview || logo} alt=''/>
<input type='file' 
id='avatar'
 className="avatar" 
 accept='image/*' 
 data-file={file} 
 onChange={handleChange}
  ref={ref}/>


</label>
</div>
    </Container>

)

}