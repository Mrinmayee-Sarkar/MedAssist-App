import * as React from 'react';
import { AppBar,Toolbar,Box,IconButton,Paper,Grid } from '@mui/material';
import  LogoutRounded from  '@mui/icons-material/LogoutRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalHospital from '@mui/icons-material/LocalHospital';
import PersonSearch from '@mui/icons-material/PersonSearch';
import Divider from '@mui/material/Divider';
import { useNavigate,Routes,Route } from 'react-router-dom';
import QuestionInterface from "./QuestionInterface";
import SubQuestionInterface from "./SubQuestionInterface";
import PatientDisplay from './PatientDisplay';
import { imageURL } from '../Services/FetchDjangoServices';
import Prescription from './Prescription';
import PrescriptionDisplay from './DisplayPrescription';


export default function DoctorDashboard(){
  var Navigate=useNavigate()
  var doctor=JSON.parse(localStorage.getItem('DOCTOR'))
    
function menubar(){
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>Navigate("/doctordashboard/questioninterface")}>
              <ListItemIcon>
                <LocalHospital />
              </ListItemIcon>
              <ListItemText primary="Questionnaires" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>Navigate("/doctordashboard/subquestioninterface")}>
              <ListItemIcon>
                <LocalHospital />
              </ListItemIcon>
              <ListItemText primary="Subquestion" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>Navigate("/doctordashboard/patientdisplay")}>
              <ListItemIcon>
                <PersonSearch />
              </ListItemIcon>
              <ListItemText primary="Patient" />
            </ListItemButton >
            </ListItem>
            </List>
            </nav>
            <Divider/>
            <nav aria-label="secondary mailbox folders">
            <List>
            <ListItem disablePadding>
            <ListItemButton>
            <ListItemText primary="Sign Out" />
            </ListItemButton>
           </ListItem>
           </List>
           </nav>
           </Box>)}

const appBar=()=>{
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
        <div style={{fontWeight:"bold",fontSize:30}}>Medassist</div>
        <IconButton color="inherit" style={{marginLeft:'auto',}}>
          <LogoutRounded/>
        </IconButton>
        </Toolbar>
        </AppBar>
        </Box>);}
      
const sideBar=()=>{
  return(
    <Grid container spacing={3}>
      <Grid item xs={2}>

   
  <Paper elevation={3} style={{display:"flex",width:200,borderRadius:20,margin:10,alignItems:"center",padding:10,flexDirection:"column"}}>
    <div><img src={`${imageURL}${doctor.photograph}`} style={{width:100,height:100, borderRadius:10}}></img>
    </div>
    <div style={{fontWeight:14, fontWeight:"bold"}}>{doctor.doctorname}</div>
    <div style={{fontWeight:10, fontWeight:300}}>{doctor.mobileno}</div>
    <div style={{fontWeight:10, fontWeight:300}}>{doctor.emailid}</div>
    <div>{menubar()}</div>
    
    
  </Paper>
  </Grid>
  <Grid item xs={10}>
  <Routes>
       <Route element={<QuestionInterface/>} path='/questioninterface'/>
        <Route element={<SubQuestionInterface/>} path='/subquestioninterface'/>
          <Route element={<PatientDisplay/>} path='/patientdisplay'/>
          <Route element={<Prescription/>} path='/prescription'/>
          <Route element={<PrescriptionDisplay/>} path='/prescriptiondisplay'/>
          
  </Routes>
  </Grid>
  </Grid>
  )

}

return(
    <div> 
      {appBar()}
      {sideBar()}

    </div>

  
)}