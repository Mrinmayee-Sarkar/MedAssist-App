import Adminlogin from "./Screens/AdminLogin";
import AdminDashboard from "./Screens/AdminDashboard";
import DoctorDashboard from "./Screens/DoctorDashboard";
import DoctorLogin from "./Screens/DoctorLogin";
import PatientDashboard from "./Screens/Patientdashboard";
import PatientLogin from "./Screens/PatientLogin";
import Prescription from "./Screens/Prescription";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Screens/Navbar";

function WelcomeMessage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Welcome to Medassist</h1>
      <p>Get started</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <Router basename="/MedAssist-App">
        <Navbar />

        <Routes>
          <Route element={<WelcomeMessage />} path="/" />
          
          <Route element={<Adminlogin />} path="/adminlogin" />
          <Route element={<AdminDashboard />} path="/admindashboard/*" />
          <Route element={<DoctorLogin />} path="/doctorlogin" />
          <Route element={<DoctorDashboard />} path="/doctordashboard/*" />
          <Route element={<PatientDashboard />} path="/patientdashboard/*" />
          <Route element={<PatientLogin />} path="/patientlogin" />
          <Route element={<Prescription />} path="/prescription" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
