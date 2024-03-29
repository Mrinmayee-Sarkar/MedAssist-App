import * as React from 'react';
import { Box, Paper, Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalHospital from '@mui/icons-material/LocalHospital';
import PersonSearch from '@mui/icons-material/PersonSearch';
import Divider from '@mui/material/Divider';
import { useNavigate, Routes, Route } from 'react-router-dom';
import DoctorsInterface from "./DoctorsInterface";
import DisplayAll from "./DisplayAll";
import PatientInterface from "./PatientInterface";
import adminimage from "../Assets/abhay.jpeg"
import DisplayTiming from "./DisplayTiming"
import ScheduleIcon from '@mui/icons-material/Schedule';

export default function AdminDashboard() {
  var Navigate = useNavigate()

  function menubar() {
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => Navigate("/admindashboard/doctorsinterface")}>
                <ListItemIcon>
                  <LocalHospital />
                </ListItemIcon>
                <ListItemText primary="Doctors" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => Navigate("/admindashboard/patientinterface")}>
                <ListItemIcon>
                  <PersonSearch />
                </ListItemIcon>
                <ListItemText primary="Patient" />
              </ListItemButton >
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => Navigate("/admindashboard/displaytiming")}>
                <ListItemIcon>
                  <ScheduleIcon/>
                </ListItemIcon>
                <ListItemText primary="Doc Avail" />
              </ListItemButton >
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => Navigate("/adminlogin")}>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>)
  }

  const sideBar = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper elevation={3} style={{ display: "flex", width: 200, borderRadius: 20, margin: 10, alignItems: "center", padding: 10, flexDirection: "column" }}>
            <div><img src={adminimage} alt='Admin' style={{ width: 100, height: 100, borderRadius: 10 }}></img>
            </div>
            <div style={{ fontSize: 14, fontWeight: "bold" }}>Peter Crook</div>
            <div style={{ fontSize: 13, fontWeight: 300 }}>9828890767</div>
            <div style={{ fontSize: 13, fontWeight: 300 }}>petercrook@gmail.com</div>
            <div>{menubar()}</div>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Routes>
            <Route element={<DoctorsInterface />} path="/doctorsinterface" />
            <Route element={<DisplayAll />} path="/displayall" />
            <Route element={<PatientInterface />} path='/patientinterface' />
            <Route element={<DisplayTiming />} path="/displaytiming" />
          </Routes>
        </Grid>
      </Grid>
    )

  }
  return (
    <div>
      {sideBar()}
    </div>
  )
}