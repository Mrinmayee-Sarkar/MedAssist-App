import { Grid,TextField,FormControlLabel,FormGroup,Checkbox,FormControl,FormLabel, Radio,RadioGroup, Button,FormHelperText} from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import makeStyles from "@mui/styles/makeStyles"
import TimeHeading from "../Component/TimeHeading"
import { useState } from "react";
import { postData} from "../Services/FetchDjangoServices";
import Swal from "sweetalert2";
import moment from "moment/moment"
import dayjs from "dayjs";
import Time from "../Assets/time.png"
const useStyles=makeStyles((theme)=>({
    container:{
        width:'83vw',
        height:'89vh',
        display:'flex',
        background:'#fff',
        alignItems:'center',
        justifyContent:'center',},
    box:{
        width:800,
        height:'auto',
        background:'#fff',
        borderRadius:10,
        padding:15,},}))

export default function TimingsInterface(props){
const[doctorid,setDoctorID]=useState("")
const[starttiming,setStartTiming]=useState("2023-01-01T00:00")
const[endtiming,setEndTiming]=useState("2023-01-01T00:00")
const[status,setStatus]=useState("")
const[days,setDays]=useState([])
const[FormError,setFormError]=useState({})

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
    var t=moment(new Date(event)).format("hh:mm A")
    setEndTiming(t)
}
const handleStartTime=(event)=>{
    var t=moment(new Date(event)).format("hh:mm A")
    setStartTiming(t)
}

const handleDays=(event)=>{
    const {value,checked} =event.target
    if (checked){
        setDays([...days,value])}
    else{
        setDays(days.filter((event)=>event!==value)) }    }
const handleReset=()=>{
    setDoctorID("")
    setStartTiming("")
    setEndTiming("")
    setStatus("")
    setDays("")
}
const handleSubmit = async()=>{
    if (!isError()){
         var body={
            doctor:doctorid,
            starttimings:starttiming.toString(),
            endtimings:endtiming.toString(),
            days:days.toString(),
            status:status,}
            
    var result = await postData("timingsubmit",body)
    if (result.status){
        Swal.fire({
        icon: 'success',
        title: result.message,
        showConfirmButton: false,
        timer: 5000 })}
    else
      {(Swal.fire({
        icon: 'error',
        title: result.message,
        showConfirmButton:false,
        timer: 5000
      })) } 
    }}
    var classes=useStyles()
    return (
        <div className={classes.container}>
        <div className={classes.box}>
        <Grid container spacing={6}>
                    <Grid item xs={12} >
                        <TimeHeading
                        color="#2d3436"
                        text='Timing Slots'
                        icon={Time}/>
                        </Grid>
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
                            onChange={(event)=>setStatus(event.target.value)} />
                            <FormControlLabel 
                            error={FormError.status}
                            onFocus={()=>handleError("",'status')}
                            control={<Radio/>}
                            label='Not-Available'
                            value='Not-Available'
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
                 defaultValue={dayjs(starttiming)}/>
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
                 defaultValue={dayjs(endtiming)}/>
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
                          label='Mon' 
                          value='Mon'
                          control={<Checkbox checked={days.includes("Mon")}/>}/>
                          <FormControlLabel 
                          error={FormError.days}
                          onFocus={()=>handleError("",'days')}
                          onChange={handleDays}
                          label="Tue" 
                          value='Tue'
                          control={<Checkbox checked={days.includes("Tue")}  />} />
                          <FormControlLabel 
                          error={FormError.days}
                          onFocus={()=>handleError("",'days')}
                          onChange={handleDays}
                          label='Wed' 
                          value='Wed'
                          control={<Checkbox checked={days.includes("Wed")}/>} />
                          <FormControlLabel  
                          error={FormError.days}
                          onFocus={()=>handleError("",'days')}
                          onChange={handleDays}
                          label='Thurs' 
                          value='Thurs'
                          control={<Checkbox checked={days.includes("Thurs")}/>} />
                          <FormControlLabel 
                          error={FormError.days}
                          onFocus={()=>handleError("",'days')} 
                          onChange={handleDays}
                          label='Fri' 
                          value='Fri'
                          control={<Checkbox checked={days.includes("Fri")}/>}/>
                          <FormControlLabel  
                          error={FormError.days}
                          onFocus={()=>handleError("",'days')}
                          onChange={handleDays}
                          label='Sat' 
                          value='Sat'
                          control={<Checkbox checked={days.includes("Sat")}/>}/>
                          <FormControlLabel 
                          error={FormError.days}
                          onFocus={()=>handleError("",'days')}
                          onChange={handleDays}
                          label='Sun' 
                          value='Sun'
                          control={<Checkbox checked={days.includes("Sun")}/>}/>
                          </FormGroup>
                          {FormError.days? <FormHelperText style={{color:'red'}}>{FormError.days}</FormHelperText>:<></>}
                          
                 </Grid>
                <Grid item xs={6}>
                    <Button 
                    color="success"
                    fullWidth 
                    variant="contained"
                    onClick={handleSubmit}>
                        Submit
                    </Button></Grid>
                    <Grid item xs={6}>
                    <Button color="error"
                    fullWidth 
                    variant="contained"
                    onClick={()=>handleReset()}>
                        Reset
                    </Button></Grid>
                     </Grid>
                </div></div>) }