import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import React, {useState , useEffect} from 'react'
import {Route , Routes , Link} from 'react-router-dom';
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";

function App() {
  return (
    <div >

      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid ">

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="navbar-brand text-light" to="/">Navbar</Link>
          <form className="d-flex">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">   
                <li className="nav-item">
                  <Link className="nav-link text-light" href="" to="/Login">Login</Link>
                </li>           
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-light"  id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Myname
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link className="dropdown-item " to="/Profile">Profile</Link></li>
                    <li><a className="dropdown-item ">Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </form>
   
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
