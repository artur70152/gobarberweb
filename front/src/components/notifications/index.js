import React, {useState, useEffect, useMemo} from 'react';
import {parseISO,formatDistance}from 'date-fns';
import pt from 'date-fns/locale/pt'
import {Container, Badge, NotificationList,Scroll, Notification} from "./styles"
import{MdNotifications} from 'react-icons/md'; 
import api from '../../services/api';
export default function Notifications(){
const [visible,setvisible]=useState(false);
const [notifications,setnotifications]=useState([]);

const hasUnread=useMemo(
()=>!!notifications.find(notification=>notification.read===false),
[notifications]
)

useEffect(()=>{
async function loadNotifications(){
    const response=await api.get('notifications');
const data=response.data.map(notification=>(notification.createdAt))
setnotifications(response.data)

}

loadNotifications()
},[])


function handleTogglevisible(){
    setvisible(!visible)
}
async function handleMarkAsRead(id){
    await api.put(`notifications/${id}`)
    setnotifications(
        notifications.map(notification=>notification._id===id?{...notification, read:true}:notification)
    )
}

return(
 <Container>
<Badge onClick={handleTogglevisible} hasUnread={hasUnread}>
    <MdNotifications color='#7159c1' size={20}/>
</Badge>
<NotificationList visible={visible}>
    <Scroll>
        {notifications.map(notification=>(
            <Notification key={notification._id} unread={!notification.read}>
        <p>{notification.content}</p>
        <time>{notification.createdAt}</time>
        {!notification.read &&(
        <button type='button' onClick={()=>handleMarkAsRead(notification._id)}>marcar como lida</button>
        )}
    </Notification>

        ))}
    
    </Scroll>
</NotificationList>
 </Container>
)

}