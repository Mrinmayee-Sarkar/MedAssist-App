import {useEffect,useState,} from 'react'
import makeStyles from "@mui/styles/makeStyles";
import MaterialTable from '@material-table/core';
import { getData,postData } from '../Services/FetchDjangoServices';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid,TextField,FormControlLabel,FormGroup,Checkbox,FormControl,FormLabel, Radio,RadioGroup, Button,FormHelperText} from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import TimeHeading from "../Component/TimeHeading"
import Swal from "sweetalert2";
import moment from "moment/moment"
import dayjs from "dayjs";
const useStyles = makeStyles((theme) => ({
  rootcontainer: {
    width: "auto",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rootbox: {
    width: "auto",
    height: "auto",
    background: "#fff",
    borderRadius: 10,
    padding: 15,
  },
    container: {
        width: "100vw",
        height: "100vh",
        background: "#00cec9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        },
    box: {
        width: 1000,
        height: "auto",
        background: "#fff",
        borderRadius: 10,
        padding: 15,
        },
      }));
export default function DisplayTiming(){
      const[timinglist,setTimingList]=useState([])
      const [open, setOpen] = useState(false)
/************************************************************************************************************ */
const[doctorid,setDoctorID]=useState("")
const[starttiming,setStartTiming]=useState("")
const[endtiming,setEndTiming]=useState("")
const[status,setStatus]=useState("")
const[days,setDays]=useState([])
const[FormError,setFormError]=useState({})
const[timingId,setTimingID]=useState("")

const handleError=(error,label)=>{
    setFormError((prev)=>({...prev,[label]:error}))}
const isError=()=>{
    var error=false
    if(doctorid.length===0)
    { handleError('Doctor ID Should Not Be Blank','doctorid')
      error=true}
    if(status.length===0)
    { handleError('Select Status','status')
      error=true}
    if(starttiming.length===0)
    { handleError('Enter Start Timing','starttiming')
      error=true}
    if(endtiming.length===0)
    { handleError('Enter End Timing','endtiming')
      error=true}
    if(days.length===0)
    { handleError('Select days','days')
      error=true}
    return error}

const handleEndTime=(event)=>{
    setEndTiming(event)}
const handleStartTime=(event)=>{
    setStartTiming(event)}

const handleDays=(event)=>{
    const {value,checked} =event.target
    if (checked){
        setDays([...days,value])}
    else{
        setDays(days.filter((event)=>event!==value)) }    }

const handleEdit=(rowData)=>{
          setTimingID(rowData.id)
          setDoctorID(rowData.doctor.id)
          setDays(rowData.days.split(","))
          
          setStartTiming(new Date("01-Jan-2000 " +rowData.starttimings))
          setEndTiming(new Date ("01-Jan-2000 " +rowData.endtimings))
          setStatus(rowData.status)
          setOpen(true)}
  
const handleDelete=async(rowData)=>{
          Swal.fire({
            title: `Do you want to delete DR.${rowData.doctor.doctorname} timings sessions?`,
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
          }).then(async(result) => {
            if (result.isConfirmed) {
              var body={'id':rowData.id}
              var result1=await postData('timingdelete',body)
              if (result1.status){
                Swal.fire('Deleted!'," ","success")
                fetchAllTiming()}
                else{
                  Swal.fire('Server Error!'," ","error")}}
                else if (result.isDenied){
                  Swal.fire('Record Not Deleted', '', 'info')}})}
  
const handleSubmit = async()=>{
          if (!isError()){
          var formData= new FormData()
          formData.append("id",timingId)
          formData.append("doctor",doctorid)
          formData.append("starttimings",moment(new Date(starttiming)).format("hh:mm A"))
          formData.append("endtimings",moment(new Date(endtiming)).format("hh:mm A"))
          formData.append("days",days)
          formData.append("status",status)}
                            
                    var result = await postData("timingedit",formData)
                    if (result.status){
                        Swal.fire({
                        icon: 'success',
                        title: result.message,
                        showConfirmButton: false,
                        timer: 5000 })
                        fetchAllTiming()}
                    else
                      {(Swal.fire({
                        icon: 'error',
                        title: result.message,
                        showConfirmButton:false,
                        timer: 5000
                      })) } 
                    }



/*********************************************************************************************************** */

        const fetchAllTiming= async () => {
        var result = await getData("timinglist");
        setTimingList(result)
       }
      useEffect(function () {
       fetchAllTiming()
  
      }, []);
        var classes = useStyles()
      const handleClose=()=>{
        setOpen(false)
      }


      const showTiming=()=>{
        return(
          <div className={classes.rootcontainer}>
        <div className={classes.rootbox}>
        <Grid container spacing={6}>
                    <Grid item xs={12} >
                        <TimeHeading
                        color="#2d3436"
                        text='Timing Slots'/></Grid>
                    <Grid item xs={6}>
                        <TextField 
                        error={FormError.doctorid}
                        onFocus={()=>handleError("",'doctorid')}
                        label="Doctor ID"
                        helperText={FormError.doctorid}
                        value={doctorid}
                        onChange={(event)=>setDoctorID(event.target.value)}
                        fullWidth/></Grid>
                    <Grid item xs={6}>
                        <FormControl>
                            <FormLabel>Status</FormLabel>
                            <RadioGroup row>
                            <FormControlLabel 
                            error={FormError.status}
                            onFocus={()=>handleError("",'status')}
                            control={<Radio/>}
                            value='Available'
                            label='Available'
                            checked={status==='Available'?true:false}
                            onChange={(event)=>setStatus(event.target.value)} />
                            <FormControlLabel 
                            error={FormError.status}
                            onFocus={()=>handleError("",'status')}
                            control={<Radio/>}
                            label='Not-Available'
                            value='Not-Available'
                            checked={status==='Not-Available'?true:false}
                            onChange={(event)=>setStatus(event.target.value)} />
                            </RadioGroup>
                            {FormError.status? <FormHelperText style={{color:'red'}}>{FormError.status}</FormHelperText>:<></>}
                            </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                            <LocalizationProvider
                            value={dayjs(starttiming)}
                            dateAdapter={AdapterDayjs}>
                            <TimePicker 
                           error={FormError.starttiming}
                            onFocus={()=>handleError("",'starttiming')}
                            label="Select Start Time" 
                            helperText={FormError.starttiming}
                            onChange={handleStartTime}
                            value={dayjs(starttiming)}/>
                            </LocalizationProvider></Grid>
                            <Grid item xs={4}>
                            <LocalizationProvider
                            value={dayjs(endtiming)}
                            dateAdapter={AdapterDayjs}>
                            <TimePicker 
                            error={FormError.endtiming}
                            helperText={FormError.endtiming}
                            onFocus={()=>handleError("",'endtiming')}
                            label="Select End Time" 
                            onChange={handleEndTime}
                            value={dayjs(endtiming)}/>
                            </LocalizationProvider></Grid>
                            <Grid item xs={12}>
                                <TextField 
                                helperText={FormError.days}
                                error={FormError.days}
                                fullWidth
                                label="Available Days"
                                value={days}
                                onChange={(event)=>setDays(event.target.value)}/>
                                </Grid>
                                <Grid item xs={12}>
                                <FormGroup value={days} row>
                                      <FormControlLabel
                                      error={FormError.days}
                                      onFocus={()=>handleError("",'days')}
                                      onChange={handleDays}
                                      label='Monday' 
                                      value='Monday'
                                      control={<Checkbox checked={days.includes("Monday")}/>}/>
                                      <FormControlLabel 
                                      error={FormError.days}
                                      onFocus={()=>handleError("",'days')}
                                      onChange={handleDays}
                                      label="Tuesday" 
                                      value='Tuesday'
                                      control={<Checkbox checked={days.includes("Tuesday")}  />} />
                                      <FormControlLabel 
                                      error={FormError.days}
                                      onFocus={()=>handleError("",'days')}
                                      onChange={handleDays}
                                      label='Wednesday' 
                                      value='Wednesday'
                                      control={<Checkbox checked={days.includes("Wednesday")}/>} />
                                      <FormControlLabel  
                                      error={FormError.days}
                                      onFocus={()=>handleError("",'days')}
                                      onChange={handleDays}
                                      label='Thursday' 
                                      value='Thursday'
                                      control={<Checkbox checked={days.includes("Thursday")}/>} />
                                      <FormControlLabel 
                                      error={FormError.days}
                                      onFocus={()=>handleError("",'days')} 
                                      onChange={handleDays}
                                      label='Friday' 
                                      value='Friday'
                                      control={<Checkbox checked={days.includes("Friday")}/>}/>
                                      <FormControlLabel  
                                      error={FormError.days}
                                      onFocus={()=>handleError("",'days')}
                                      onChange={handleDays}
                                      label='Saturday' 
                                      value='Saturday'
                                      control={<Checkbox checked={days.includes("Saturday")}/>}/>
                                      <FormControlLabel 
                                      error={FormError.days}
                                      onFocus={()=>handleError("",'days')}
                                      onChange={handleDays}
                                      label='Sunday' 
                                      value='Sunday'
                                      control={<Checkbox checked={days.includes("Sunday")}/>}/>
                                      </FormGroup>
                                      {FormError.days? <FormHelperText style={{color:'red'}}>{FormError.days}</FormHelperText>:<></>}
                                        </Grid>
                                          </Grid></div></div>) }
      
      const showTimingDetails=()=>{
        return(
          <div>
            <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            maxWidth={"md"}>
        <DialogContent>
          {showTiming()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Edit Data</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>);}
      
      function showTimingList() {
        return (
          <MaterialTable
            title="Doctor Timings"
            columns={[
              { title: 'Doctor',render:(rowData)=><div><div>{rowData.id}/{rowData.doctor.doctorname}</div></div> },
              { title: 'Status', field: 'status' },
              { title: 'Start Time', field: 'starttimings'},
              { title: 'End Time', field: 'endtimings'},
              {title:'Days Available',field: 'days'},
             ]}
            data=
              {timinglist}

               
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit User',
                onClick: (event, rowData) => handleEdit(rowData)},
                {
                  icon: 'delete',
                  tooltip: 'Delete User',
                  onClick: (event, rowData) =>handleDelete(rowData) } ]}/> )}
    
      
    return (
        <div className={classes.container}>
      <div className={classes.box}>
      {showTimingList()}</div>
      {showTimingDetails()}</div>
      
)
       

}