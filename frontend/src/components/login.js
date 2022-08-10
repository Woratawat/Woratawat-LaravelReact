import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import { Link} from 'react-router-dom';

export default function Login({}) {



  return(
    <div className="row d-flex justify-content-center pt-5">

      <div className="col-sm-6 ">
        <div className="card p-4">
          <p className="text-center">Login</p>

          <div className="form-group">
            <label for="Username" className="form-label">Username</label>
            <input type="text" className="form-control" id="Username" aria-describedby="emailHelp" />
          </div>
          <div className="form-group mt-3">
            <label for="Password" className="form-label">Password</label>
            <input type="password" className="form-control" id="Password" />
          </div>
          <button type="button" class="btn btn-primary mt-4">Login</button>
          <hr/>
          <p className="text-center"><Link to="/Register">Register</Link></p>
        </div>                     
      </div>

    </div>
  )
}