import React, {useState , useEffect} from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import logo from '../logo.svg';
import {  MDBInput ,MDBBtn  } from 'mdb-react-ui-kit'
import axios from 'axios'

export default function Profile() {

  const [images, setImage] = useState([]);
  const [imagURLs, setImageURLs] = useState([]);
  const [data, setData] = useState({
    user: '',
    pass: '',
    fname: '',
    lname: '',
    pic: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(()=>{

      if(images.length < 1 )return;
      const newImgURL  = []
      images.forEach(image => newImgURL.push(URL.createObjectURL(image)))
      setImageURLs(newImgURL)

  },[images]);

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
        setData({...data, 'pic':image})
        setImage([...e.target.files])
      }
    }

  }

  const handleChange = (e) => {

    setData({ ...data, [e.target.name]: e.target.value });

  };

  const varlidateForm = (e) => {

    const {user,pass,fname,lname,pic} = data
    const newErrors = {}
    var regex = /(?=.*[0-9])(?=.*[_])[a-zA-Z0-9_]/;

    var countPass = []

    Object.values(pass).map((d,i)=>{
      // console.log(d.charCodeAt(0))
      if(pass[1].charCodeAt(0) === pass[i].charCodeAt(0)+1 || pass[1].charCodeAt(0)+1 === pass[i].charCodeAt(0)){
        countPass.push(true)
      }else{
        countPass.push(false)
      }

    });

    const duplicate = countPass.filter(value => value === true).length;

    if(!user || user === '')newErrors.user='Please enter username.'
    else if(user.length < 4)
      newErrors.user='Please enter username more than 4 character.'
    else if(user.length > 12)
      newErrors.user='Please enter username less than 12 character.'
    else if(regex.test(JSON.stringify(user)) === false)
      newErrors.user='รับตัวอักษรได้เฉพาะ A-Z, a-z, 0-9, _ (underscore)'
     
    if(!pass || pass === '')newErrors.pass='Please enter password.'
    else if(pass.length < 6)
      newErrors.pass='Please enter password more than 6 character.'
    else if(duplicate !== 0)
      newErrors.pass='password ต้องไม่เป็นตัวอักษรหรือตัวเลขเรียงกัน เช่น 123456, abcde'

    if(!fname || fname === '')newErrors.fname='Please enter firstname.'
    else if(fname.length > 60)
      newErrors.fname='Please enter firstname less than 60 character.'

    if(lname.length > 60)newErrors.lname='Please enter lastname less than 60 character.'

    if(!pic || pic === '')newErrors.pic='Please choose your Profile Image.'

  };

  function handleSubmit(e){

    e.preventDefault()

    const fromErrors = varlidateForm()
    if(Object.keys(fromErrors).length > 0){
      setErrors(fromErrors);
    }else{
      console.log(data)
    }

  }

  return(
    <form onSubmit={handleSubmit} className='g-3 row d-flex justify-content-center pt-5'>

      <div className="col-sm-6 ">

        <div className="card p-4">
          <p className="text-center">Profile</p>

          <div className="form-group">
            <label  className="form-label">Username</label>
            <p>Username</p>
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
            errors.lname ? <span>test</span> : null
          }
        </div>


        <div className="text-center">

          {
            imagURLs.length !== 0 ? imagURLs.map((imgsrc,index)=>(
              <img key={`i_${index}`} src={imgsrc} height="250" width="250" className="rounded" alt="logo" />
            )):
              <img src={logo} height="250" width="250" className="rounded" alt="logo" />
          }

        </div>

        <div className='col-md-12 mt-4'>
          {/* <MDBFile label='Profile Image' id='customFile' onChange={onImageChange}  />   */}
          <input className='form-control' multiple accept='image/*' type='file'  onChange={onImageChange}/>
          {
            errors.pic ? <span className="text-danger">{errors.pic}</span> : null
          }
        </div>


        <br/>
        <MDBBtn type="submit" multiple accept="image/*"  color="primary">
          Submit
        </MDBBtn>

        </div>

      </div>
    
    </form>
  )
}
