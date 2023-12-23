import { Link } from "react-router-dom"
export default function Navbar(){
return(

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">MedAssist</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/adminlogin">Admin Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/doctorlogin">Doctor Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/patientlogin">Patient Login</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
)}