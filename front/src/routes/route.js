import { Navigate, Outlet} from 'react-router-dom';
import AuthLayout from '../pages/_layouts/auth';
import DeafaultLayout from '../pages/_layouts/default';
import {store} from '../store/index';


export default function RouteWrapper({ isPrivate=false, element:Element, ...rest }) {
  const signed = store.getState().auth.signed;
  //console.log(store.getState())
 //console.log(signed)
 
//O componente <Navigate /> não será renderizado diretamente na
// tela como um elemento visual. Em vez disso, ele será manipulado
// internamente pelo roteador para realizar a navegação 
//programaticamente. O roteador detectará o <Navigate /> 
//durante a renderização e executará a ação de navegação 
//correspondente, redirecionando para a rota especificada.

  if (!signed && isPrivate) {
    return <Navigate to="/"/>;
  }

  if (signed && !isPrivate) {
    return <Navigate to="/dashboard"/>;
  }
  const Layout=signed ? DeafaultLayout:AuthLayout
 
  return <div><Layout><Outlet /></Layout></div>// <-- nested routes render here
}

//return <Route {...rest} render={(props) => <Element {...props} />} />;