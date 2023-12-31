import { lighten } from "polished";
import PerfectScrollbar from 'react-perfect-scrollbar';
import styled,{css} from "styled-components";


export const Container=styled.div`
position: relative;
`;


export const Badge=styled.button`
background: none;
border: 0;
position: relative;
${props => props.hasUnread && css`
    &::after {
      position: absolute;
      right: 0;
      top: 0;
      right: 0;
      width: 8px;
      height: 8px;
      background-color: #ff892e;
      content:'';
      border-radius: 50%;
    }
  `}

`;
export const NotificationList=styled.div`
position: absolute;
width: 260px;
height: 400px;
left: -30px;
top:63px;
background: rgba(0,0,0,0.6);
border-radius:4px;
padding: 20px;
display: ${props=>(props.visible? 'block':'none')};




&::before {
content: '';
position:absolute;
left: calc(50%-20px);
top: -20px;
width: 0;
height: 0;
border-left:20px solid transparent;
border-right:20px solid transparent;
border-bottom:20px solid  rgba(0,0,0,0.6);
}
`;
export const Scroll=styled(PerfectScrollbar)`
max-height: 400px;


`;


export const Notification=styled.div`
color:#FFF;
&+div{
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255,255,255 0.1);
}
P{
    font-size: 13px;
    line-height: 18px;

}
time{
    font-size: 12px;
    opacity: 0.6;
}
button{
    font-size:12px;
    border: 0;
    background: none;
    color: ${lighten(0.2,'#7159c1')};
    padding: 0 5px;
    margin: 0 5px;
    border-left: 1px solid rgba(255,255,255 0.1);
}
${props => props.unread && css`
&::after{
    content: '';
display: inline-block;
margin-left: 5px;
width: 6px;
height: 6px;
background: #ff892e;
border-radius: 50%;
}
`}


`;