import React, {useState , useEffect} from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {  MDBInput ,MDBBtn  } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import { Link} from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert'; 

export default function Login({}) {
  
  const navigate  = useNavigate()
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    user: '',
    pass: '',
  });

  const handleChange = (e) => {

    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });

  };

  const varlidateForm = (e) => {

    const {user,pass} = data

    const newErrors = {}

    if(!user || user === '')newErrors.user='Please enter username.'
   
    if(!pass || pass === '')newErrors.pass='Please enter password.'

   return newErrors
  };

  function handleSubmit(e){

    e.preventDefault()

    const fromErrors = varlidateForm()
    if(Object.keys(fromErrors).length > 0){
      setErrors(fromErrors);
    }else{
      setErrors({})
      // console.log(data)
      const fromData = new FormData();

      fromData.append('user',data.user)
      fromData.append('pass',data.pass)

      swal("Loading!","Please wait...","warning",{buttons: false,});
      axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post('/api/login',fromData).then(res =>{
          swal.close()
          if(res.data.success === true){        
            localStorage.setItem('auth_token',res.data.token)
            localStorage.setItem('username',res.data.user)
            swal("Success!",res.data.message,"success",{buttons: false,});
            navigate('/')
          }else{
            setData({ ...data,'pass': '' });
            setErrors({...errors, 'pass':res.data.pass})
          }
          
        });
        
      });

    }

  }


  return(
    <form onSubmit={handleSubmit} className='g-3 row d-flex justify-content-center pt-5'>
      <div className="col-sm-6 ">
        <div className="card p-4">
          <p className="text-center">Login</p>

          <div className='col-md-12 mt-4'>
            <MDBInput      
                value={data.user}
                name='user'
                onChange={handleChange}
                label='Username'
              />          
            {
              errors.user ? <span className="text-danger">{errors.user}</span> : null
            }
          </div>

          <div className='col-md-12 mt-4'>
            <MDBInput
              value={data.pass}
              name='pass'
              onChange={handleChange}
              
              label='Password'
              type='Password'
            />         
            {
              errors.pass ? <span className="text-danger">{errors.pass}</span> : null
            }
          </div>

          <br/>
          <MDBBtn type="submit" color="primary">
            Login
          </MDBBtn>
          
          <hr/>
          <span className="text-center"><Link to="/Register">Register</Link></span>

        </div>
      </div>
    </form>
  )
}
