import * as React from 'react';
import { AppBar,Toolbar,Box,IconButton,Paper,Grid, TextField,InputAdornment } from '@mui/material';
import  LogoutRounded from  '@mui/icons-material/LogoutRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate,Routes,Route } from 'react-router-dom';
import ListOfDoctors from "./ListOfDoctors";
import adminimage from"../Assets/abhay.jpeg"
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import SelectedDoctor from "./SelectedDoctor";
import PatientQuestioner from "./PatientQuestioner";
import PatientLogin from './PatientLogin';

export default function PatientDashboard(){
  var patient=useSelector((state)=>state.patient)
  var value=Object.values(patient)[0]
  console.log(value)
  var[pattern,setPattern]=useState('')
  var [status,setStatus]=useState(true)
  var Navigate=useNavigate()
function menubar(){
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
       <nav aria-label="secondary mailbox folders">
            <List>
            <ListItem disablePadding>
            <ListItemButton onClick={()=>Navigate('/patientlogin')}>
            <ListItemText primary="Sign Out" />
            </ListItemButton>
           </ListItem>
           </List>
           </nav>
           </Box>)}

const appBar=()=>{
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{background:"#22a6b3"}}>
          <Toolbar>
        <div style={{fontWeight:"bold",fontSize:30}}>Medassist</div>
        <div style={{width:550,background:'#ffff',marginLeft:"25%",borderRadius:5,padding:2}}> 
        <TextField 
        onChange={(event)=>setPattern(event.target.value)}
        placeholder='Search doctor name...'
        fullWidth
        size='small'
        sx={{border: 'none',"& fieldset": { border: 'none' },}} 
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}/>
        
        
        </div>
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
    <div style={{fontWeight:14, fontWeight:"bold"}}>{value.PatientName}</div>
    <div style={{fontWeight:10, fontWeight:300}}>+91{value.Mobileno}</div>
    <div style={{fontWeight:10, fontWeight:300}}>{value.EmailId}</div>
    <div>{menubar()}</div>
    
    
  </Paper>
  </Grid>
  <Grid item xs={10}>
  {status?< ListOfDoctors pattern={pattern} setStatus={setStatus}/>:<></>}
  <Routes>
          <Route element={<PatientLogin/>} path='/patientlogin'/>
          <Route element={<ListOfDoctors/>} path='/listofdoctors'/>
          <Route element={<SelectedDoctor/>} path='/selecteddoctor'/>
          <Route element={<PatientQuestioner/>} path='/patientquestioner'/>
          
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