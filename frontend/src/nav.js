import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "./App.css"
import React, { } from 'react'
import { Link  , useNavigate} from 'react-router-dom';
import swal from 'sweetalert'; 
import axios from 'axios'

export default function Navbar({}) {

  const navigate  = useNavigate()

  function onLogout(e){

    e.preventDefault()

      axios.post('/api/logout').then(res =>{

        if(res.data.success === true){
          localStorage.removeItem('auth_token',res.data.token)
          localStorage.removeItem('username',res.data.user)
          swal("Success!",res.data.message,"success",{buttons: false,});
          navigate('/')
        }
        
      });

  }

  var AuthNav = ''

  if(!localStorage.getItem('auth_token')){

    AuthNav = (
      <ul className="navbar-nav">  
        <li className="nav-item">
          <Link className="nav-link text-light"  to="/Login">Login</Link>
        </li>  
      </ul> 
    );

  }else{

    AuthNav = (
      // <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
      //   <li><Link className="dropdown-item " to="/Profile">Profile</Link></li>
      //   <li><button onClick={onLogout} className="dropdown-item ">Logout</button></li>
      // </ul>
      <ul className="navbar-nav">  
        <li className="nav-item">
          <Link className="nav-link text-light" to="/Profile">Profile</Link>
        </li>   
        <li className="nav-item">
          <span onClick={onLogout}  className="nav-link text-light pointer">Logout</span>
        </li>   
      </ul>
    );

  }

  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid ">

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="navbar-brand text-light" to="/">Home</Link>
        <div className="d-flex">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
          
            {AuthNav}

          </div>
        </div>

      </div>
    </nav>

  )
}