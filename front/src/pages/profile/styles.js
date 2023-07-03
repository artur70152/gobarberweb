import styled from "styled-components";
import{darken} from 'polished'
export const Container=styled.div`
max-width:700px;
margin:50px auto;
form{
    display:flex;
    flex-direction:column;
    margin-top:30px;
input{
background: rgba(0,0,0,0.1);
border:0;
border-radius:4px;
height: 44px;
padding: 0 15px;
color: #fff;
margin: 0 0 10px;

::placeholder{
    color: rgba(255,255,255,0.7);
}
hr{
border:0;
height:1px;
background: rgba(255.255,255,0.2);
margin: 10px 0 20px;


}
}
button{
   margin:5px 0 0 ;
   height:44px;
   background:#3b9eff;
   font-weight:bold;
   color: #fff;
   border:0;
   border-radius: 4px;
font-size: 16px;
transition: background 0.2s;
:hover{
    background: ${darken(0.1,'#3b9eff')}
}
}
.aa{
    background:#f64c75;
    :hover{
    background: ${darken(0.1,'#f64c75')}
}
}
a{
color: #FFF;
margin-top:15px;
font-size:16px;
opacity:0.8;
:hover{
    opacity: 1;
}
}
}


#af{
   
    align-self: center;
margin-bottom: 30px;

label{
    cursor: pointer;

&:hover{
    opacity: 0.7;
}
img{
    height: 120px;
    width: 120px;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.3);
    background: #eee;
}
}
input{

display: initial;
cursor: pointer;
}


}




`;