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
import DoctorsInterface from "./DoctorsInterface";
import DisplayAll from "./DisplayAll";
import PatientInterface from "./PatientInterface";
import adminimage from"../Assets/abhay.jpeg"


export default function AdminDashboard(){
  var Navigate=useNavigate()
    
function menubar(){
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>Navigate("/admindashboard/doctorsinterface")}>
              <ListItemIcon>
                <LocalHospital />
              </ListItemIcon>
              <ListItemText primary="Doctors" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>Navigate("/admindashboard/patientinterface")}>
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
    <div><img src={adminimage} style={{width:100,height:100, borderRadius:10}}></img>
    </div>
    <div style={{fontWeight:14, fontWeight:"bold"}}>Peter Crook</div>
    <div style={{fontWeight:10, fontWeight:300}}>9828890767</div>
    <div style={{fontWeight:10, fontWeight:300}}>petercrook@gmail.com</div>
    <div>{menubar()}</div>
    
    
  </Paper>
  </Grid>
  <Grid item xs={10}>
  <Routes>
          <Route element={<DoctorsInterface/>} path="/doctorsinterface"/>
          <Route element={<DisplayAll/>} path="/displayall"/>
          <Route element={<PatientInterface/>} path='/patientinterface'/>
          
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