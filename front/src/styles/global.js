import { createGlobalStyle } from "styled-components";
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css'
const Global=createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
* {   

margin:0;
padding:0;
outline: 0;
box-sizing:border-box;



}
*:focus {
    outline:0;
}
html, body, #root{
    background:linear-gradient(-90deg,#7159c1,#ab59c1);
    height:100%
    
  
}
body{
    -webkit-font-smoothing:antialiased;
}
body,input,button{

    font:14px sans-serif ;
::-webkit-input-placeholder{
    color:black;
}

}

a{
text-decoration: none;
}
ul{
    list-style:none;  
}
button{
    cursor:pointer;
}


`;
export default Global;