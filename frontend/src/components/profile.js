import React, {useState , useEffect} from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {  
  MDBInput ,
  MDBBtn  , 
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane 
} from 'mdb-react-ui-kit'
import axios from 'axios'
import swal from 'sweetalert'; 
import "../App.css"

export default function Profile() {

  const [data, setData] = useState({
    id: '',
    user: '',
    fname: '',
    lname: '',
  });
  const [pass, setPass] = useState('');
  const [images, setImage] = useState([]);
  const [showimages, setShowimage] = useState([]);
  const [errors, setErrors] = useState({});
  const [errorsPass, setErrorPass] = useState({});
  const [Active, setActive] = useState('tab1');

  useEffect(()=>{
    
    swal("Loading!","Please wait...","warning",{buttons: false,});
    getProfile()

  },[]);

  function getProfile(){

    axios.get('/api/profile').then(res =>{

      swal.close()
      setData({
        id: res.data.data.id,
        user: res.data.data.name,
        fname: res.data.data.firstname,
        lname: res.data.data.lastname,
      })
      setImage(res.data.data.pic)
    });

  }

  function handleTabClick(value){
    if (value === Active) {
      return;
    }

    setActive(value);
  };

  function onImageChange(e){

    const image = e.target.files[0];

    if (!image.name.match(/\.(jpg|jpeg|png|bmp)$/)) {

      setErrors({...errors, 'pic':'select valid imag.'})
      return false;

    }else{

      if (image.size > 5e6) {

        setErrors({...errors, 'pic':'Please upload a file smaller than 5 MB.'})
        return false;

      }else{

        e.persist();
        setImage(image)
        const reader = new FileReader();
        reader.onload = () =>{
          if(reader.readyState === 2 ){
            setShowimage(reader.result)
          }

        }
        reader.readAsDataURL(e.target.files[0])

      }

    }

  }

  const handleChange = (e) => {

    setData({ ...data, [e.target.name]: e.target.value });

    setPass(e.target.value);

  };

  function varlidateForm(e){

    const {fname,lname,} = data

    const newErrors = {}

    if(!fname || fname === '')newErrors.fname='Please enter firstname.'
    else if(fname.length > 60)
      newErrors.fname='Please enter firstname less than 60 character.'

    if(lname.length > 60)newErrors.lname='Please enter lastname less than 60 character.'


   return newErrors

  };

  function handleSubmit(e){

    e.preventDefault()

    const fromErrors = varlidateForm()
    if(Object.keys(fromErrors).length > 0){
      setErrors(fromErrors);
    }else{
      setErrors({})
      const fromData = new FormData();

      fromData.append('id',data.id)
      fromData.append('fname',data.fname)
      fromData.append('lname',data.lname)
      fromData.append('pic',images)

      swal("Loading!","Please wait...","warning",{buttons: false,});

      axios.post('/api/profile/edit',fromData).then(res =>{

        if(res.data.success === true){
          swal.close()
          swal("Success!",res.data.message,"success",{buttons: false,});
          getProfile()

        }
        
      });

    }

  }

  function varlidatePassword(e){

    const newErrors = {}
    var countPass = []

    Object.values(pass).map((d,i)=>{
      if(pass[1].charCodeAt(0) === pass[i].charCodeAt(0)+1 || pass[1].charCodeAt(0)+1 === pass[i].charCodeAt(0)){
        countPass.push(true)
      }else{
        countPass.push(false)
      }

    });
    const duplicate = countPass.filter(value => value === true).length;
    
    if(!pass || pass === '')newErrors.pass='Please enter password.'
    else if(pass.length < 6)
      newErrors.pass='Please enter password more than 6 character.'
    else if(duplicate !== 0)
      newErrors.pass='password ต้องไม่เป็นตัวอักษรหรือตัวเลขเรียงกัน เช่น 123456, abcde'

    return newErrors
  }

  function handleSubmitPassword(e){

    e.preventDefault()

    const passErrors = varlidatePassword()

    if(Object.keys(passErrors).length > 0){
      setErrorPass(passErrors);
    }else{
      setErrors({})
      const fromData = new FormData();

      fromData.append('id',data.id)
      fromData.append('pass',pass)

      swal("Loading!","Please wait...","warning",{buttons: false,});

      axios.post('/api/profile/changePassword',fromData).then(res =>{

        // console.log(res.data)
        if(res.data.success === true){
          swal.close()
          swal("Success!",res.data.message,"success",{buttons: false,});
          setPass('');
          setErrorPass({})
          // getProfile()
        }else{
          swal.close()
          setPass('');
          setErrorPass({...errorsPass, 'pass':res.data.message})
        }
        
      });

    }

  }

  return(
    <div className='card mt-3'>
      <h1 className='text-center '>My Profile</h1>
      <MDBTabs fill className='mb-3'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleTabClick('tab1')} active={Active === 'tab1'}>
              Profile
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleTabClick('tab2')} active={Active === 'tab2'}>
              Change Password
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={Active === 'tab1'}>
          <form onSubmit={handleSubmit} className='g-3 row d-flex justify-content-center pt-3'>

            <div className="col-sm-6 ">

              <div className="p-4">
                <p className="text-center">Edit Profile</p>

                <div className='col-md-12 mt-4'>
                  <MDBInput
                    value={data.user}
                    name='fname'
                    label='Username'
                    disabled
                  />        
                </div>

                <div className='col-md-12 mt-4'>
                  <MDBInput
                    value={data.fname}
                    name='fname'
                    onChange={handleChange}              
                    label='First Name'
                  />        
                  {
                    errors.fname ? <span className="text-danger">{errors.fname}</span> : null
                  }
                </div>

                <div className='col-md-12 mt-4'>
                  <MDBInput      
                    value={data.lname}
                    name='lname'
                    onChange={handleChange}
                    label='Last Name'
                  />          
                  {
                    errors.lname ? <span className="text-danger">{errors.lname}</span> : null
                  }
                </div>

                <div className="text-center">

                  {
                    showimages.length !== 0 ? 
                    <img src={showimages} height="250" width="250" className="circle" alt="img" />
                    :
                    <img src={images} height="250" width="250" className="circle" alt="img" />

                  }

                </div>

                <div className='col-md-12 mt-4'>
                  <input className='form-control' multiple accept='image/*' type='file'  onChange={onImageChange}/>
                  {
                    errors.pic ? <span className="text-danger">{errors.pic}</span> : null
                  }
                </div>

                <br/>
                <div className="d-grid gap-2 col-6 mx-auto ">
                  <MDBBtn type="submit" color="primary">
                    Submit
                  </MDBBtn>
                  <MDBBtn color="warning">
                      Cancel
                  </MDBBtn>
                </div>

              </div>

            </div>

          </form>
        </MDBTabsPane>
        <MDBTabsPane show={Active === 'tab2'}>
          <form onSubmit={handleSubmitPassword} className='g-3 row d-flex justify-content-center pt-3'>

            <div className="col-sm-6 ">
              
            <div className=" p-4">
                <p className="text-center">Change Password</p>

                <div className='col-md-12 mt-4'>
                  <MDBInput      
                    value={pass}
                    name='pass'
                    onChange={handleChange}
                    label='Password'
                    type='Password'
                  />  
                  {
                    errorsPass.pass ? <span className="text-danger">{errorsPass.pass}</span> : null
                  }
                </div>

                <div className="d-grid gap-2 col-6 mx-auto mt-4">
                  <MDBBtn type="submit" color="primary">
                    Submit
                  </MDBBtn>
                  <MDBBtn color="warning">
                      Cancel
                  </MDBBtn>
                </div>

              </div>
             
            </div>

          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>

    
  )
}
