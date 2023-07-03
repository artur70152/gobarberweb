import styled from 'styled-components';

export const Container=styled.div`

max-width: 600px;
margin: 50px auto;
display: flex;
flex-direction: column;
header{
   
display: flex;
align-self: center;
align-items: center;

.w{
    align-items: center;
padding-left: 83px;
}

button{
border: 0;
background: none;
}
#q{
    color: #FFF;
    font-size: 24px;
    margin: 0 15px;
}

}
ul{
    
    display: grid;
    grid-template-columns: repeat(2, 1fr);
grid-gap: 15px;
margin-top: 30px;
}
`;
export const Time=styled.li`
opacity: ${props=>(props.past? 0.3:1)};
display:flex;
padding: 20px;
border-radius: 4px;
background: #fff;

strong{
    padding-right:5px ;
display: block;
opacity: ${props=>(props.avaiable? 0.4:1)};
color: ${props=>(props.avaiable ? '#999':'#7159c7')};
font-size: 20px;
font-weight: normal;

}

span{
display: block;
margin-top: 3px;
opacity: ${props=>(props.avaiable? 0.4:1)};

color: ${props=>(props.avaiable ? '#999':'#666')};; 



}

`




