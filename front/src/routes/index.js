import {Routes,Route} from 'react-router-dom';
//import Route from './route'
import React from 'react';
//import AuthLayout from '../pages/_layouts/auth';
//import DeafaultLayout from '../pages/_layouts/default';
import Singin from '../pages/singin';
import Singup from '../pages/singup';

import Dashboard from '../pages/dashboard/index';
import Profile from '../pages/profile';
import RouteWrapper from './route';


export default function Routesa(){
 
    return (
        <Routes >
         
          <Route element={<RouteWrapper/>} >
            <Route path="/" element={<Singin/>} />
            <Route path="/register" element={<Singup />} />
            
          </Route>
         
          <Route element={<RouteWrapper isPrivate />}>
            
        
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
       
    
          </Route>
        
        </Routes>
      );


}