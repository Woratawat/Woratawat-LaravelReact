import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import React, {useState ,useEffect } from 'react'
import {Route , Routes , Navigate } from 'react-router-dom';
import Navbar from "./nav";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import axios from 'axios'


axios.defaults.baseURL = "http://localhost:8100/"
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '' ;
  return config;
})

function App() {

  const [auth, setAuth] = useState(false);
  // const [load, setLoad] = useState(true);

  useEffect(()=>{

    axios.get('/api/checkingAuthenication').then(res =>{

      if(res.data.success === true){
        setAuth(true)
      }
      // setLoad(false)

    });

    // return ()=>{
    //   setAuth(false)
    // }

  },[auth]);

  // if(load){
  //   return <h1>Loading...</h1>
  // }

  return (
    <div>
      
      <Navbar />
    
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={ <Login />} />
          <Route path="/Register" element={  <Register />} />
          <Route path="/Profile" element={ auth ? <Profile />  : <Navigate to='/Login' /> } />
        </Routes>
      </div>
      
    </div>
  );
}

export default App;
