import { useEffect } from 'react'
import { useLocation , Navigate , Outlet } from "react-router-dom"
import { useSelector  } from 'react-redux';

const RequireAuth = () =>{

  const location = useLocation();
    
  const isLogin = useSelector(state => state.auth.auth.token)
  useEffect(() => {
    // console.log(isLogin)
  },[]);
  
  return (
    isLogin == null ?  <Navigate to="/Login" state={{from: location}} replace /> : <Outlet/> 
  )

}

export default RequireAuth;