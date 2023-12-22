import TimingsInterface from "./Screens/TimingsInterface";
import DisplayTiming from "./Screens/DisplayTiming";
import Adminlogin from "./Screens/AdminLogin";
import AdminDashboard from "./Screens/AdminDashboard";
import DoctorDashboard from "./Screens/DoctorDashboard";
import DoctorLogin from "./Screens/DoctorLogin";
import PatientDashboard from "./Screens/Patientdashboard";
import PatientLogin from "./Screens/PatientLogin";
import Prescription from "./Screens/Prescription";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

function App() {
  
  return (<div>
    <Router>
      <Routes>
        <Route element={<TimingsInterface/>} path='/timingsinterface'/>
        <Route element={<DisplayTiming/>} path='/displaytiming'/>
        <Route element={<Adminlogin/>} path='/adminlogin'/>
        <Route element={<AdminDashboard/>} path='/admindashboard/*'/>
        <Route element={<DoctorLogin/>} path='/doctorlogin'/>
        <Route element={<DoctorDashboard/>} path='/doctordashboard/*'/>
        <Route element={<PatientDashboard/>} path='/patientdashboard/*'/>
        <Route element={<PatientLogin/>} path='/patientlogin'/>
        <Route element={<Prescription/>} path='/prescription'/>
       </Routes>
    </Router>
    
  </div>

  );

}

export default App





















