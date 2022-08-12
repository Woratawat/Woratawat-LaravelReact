import React from 'react'
import {Route , Routes  } from 'react-router-dom';
import Navbar from "./components/nav";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import RequireAuth from './components/requireAuth';
import axios from 'axios'
import { store } from './redux/store';

axios.defaults.baseURL = "http://localhost:8100/"
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config){
  // const token = localStorage.getItem('auth_token');
  const token = store.getState().auth.auth.token;
  // console.log(test)
  config.headers.Authorization = token ? `Bearer ${token}` : '' ;
  return config;
})

function App() {

  return (
    <div>
      
      <Navbar />
    
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={ <Login />} />
          <Route path="/Register" element={  <Register />} />

          <Route element={<RequireAuth/>}>
            <Route path="/Profile" element={ <Profile /> } />
          </Route>

        </Routes>
      </div>
      
    </div>
  );
}

export default App;
