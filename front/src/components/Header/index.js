import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Content,Profile } from "./styles.js";
import Notifications from "../notifications/index.js";
import logo from "../../../src/logo.svg"
export default function Header(){
const profile=useSelector(state=>state.user.profile)
console.log(profile)
return(
<Container>
<Content>
<nav>
<img src={logo} alt='Gobarber' width={50} height={50}/>
<Link to='/dashboard'>DASHBOARD</Link>
</nav>
<aside>
    <Notifications/>
<Profile>
<div>
<strong>
{profile.name}
</strong>
<Link to='/profile'>      meu perfil</Link>
</div>
<img src={profile.avatar.url||logo}alt='Gobarber' width={50} height={50}/>
</Profile>
</aside>

</Content>
</Container>


)



}