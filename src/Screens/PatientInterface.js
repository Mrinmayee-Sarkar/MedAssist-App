import  makeStyles  from "@mui/styles/makeStyles"
import { Grid,TextField,Button,FormHelperText } from "@mui/material"
import Heading from "../Component/Heading"
import { useState } from "react"
import { postData,serverURL } from "../Services/FetchDjangoServices"
import Swal from "sweetalert2"
import patientimage from "../Assets/patients.png"
const useStyles=makeStyles((theme)=>({
    container: {
        width: "85vw",
        height: "90vh",
        background: "#f2f2f2",
        display:"flex"
        
      },
      box: {
        width: 800,
        height: "80%",
        background: "#fff",
        borderRadius: 10,
        padding: 15,
        marginLeft:"18%",
        marginTop:"3%",

      },

}))
export default function PatientInterface(props){
 const [patientname,setPatientname] = useState("")
 const [dob,setDOB] = useState("")
 const [emailID,setEmailID] = useState("")
 const [mobileno,setMobileNo] = useState("")
 const [password,setPassword] = useState("")
 const [city,setCity] = useState("")
 const [age,setAge] = useState("")
 const [gender,setGender] = useState("")
 const [formError,setFormError] = useState({})

const handleError=(error,label)=>{
setFormError((prev)=>({...prev,[label]:error}))}
const isError=()=>{
    var error=false
    if(patientname.length==0)
    { handleError('Patient Name should not be blank','patientname')
      error=true}
    if(dob.length==0)
    { handleError('Enter Date Of Birth','dob')
      error=true}
    if(city.length==0)
    { handleError('Enter City','city')
      error=true}
    if(emailID.length==0 ||!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(emailID))
    { handleError('Enter Correct Email ID','emailID')
      error=true}
    if(mobileno.length==0 ||!(/^[0-9]{10}$/).test(mobileno))
    { handleError('Mobile No. should not be blank','mobileno')
      error=true}
    if(password.length==0)
    { handleError('Enter password','password')
        error=true}
    if(age.length==0)
        { handleError('Enter age','age')
            error=true}
        
    if(gender.length==0)
    { handleError('Enter gender','gender')
        error=true}
    
    return error}

const handleReset=()=>{
    setCity("")
    setDOB("")
    setPatientname("")
    setPassword("")
    setEmailID("")
    setMobileNo("")
    setAge("")
    setGender("")
}

const handleSubmit = async () =>{
    if (!isError()){
    var formData= new FormData()
            formData.append("Mobileno",mobileno)
            formData.append("PatientName",patientname)
            formData.append("DOB",dob)
            formData.append("EmailId",emailID)
            formData.append("City",city)
            formData.append("Password",password)
            formData.append("Age",age)
            formData.append("Gender",gender)
    var result= await postData("submitpatient",formData)
        if(result.status){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: result.message,
                showConfirmButton: false,
                timer: 2000
                })}
        else {(Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: result.message,
            showConfirmButton: false,
            timer: 2000
          }) )} }}




  var classes=useStyles()
    return (
    <div className={classes.container}>
    <div className={classes.box}>
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Heading
                    icon={patientimage}
                    color="#079992"
                    text="Patient Registration"
                />

            </Grid>
            <Grid item xs={5}>
                <TextField 
                error={formError.patientname}
                fullWidth 
                variant="outlined" 
                label="Enter Name"
                value={patientname}
                helperText={formError.patientname}
                onChange={(event)=>setPatientname(event.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                error={formError.dob}
                fullWidth 
                variant="outlined" 
                placeholder="Enter DOB"
                type="date"
                value={dob}
                helperText={formError.dob}
                onChange={(event)=>setDOB(event.target.value)}/>
            </Grid>
            <Grid item xs={3}>
                <TextField 
                error={formError.age}
                fullWidth 
                variant="outlined" 
                label="Enter Your Age"
                value={age}
                helperText={formError.age}
                onChange={(event)=>setAge(event.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField 
                error={formError.gender}
                fullWidth 
                variant="outlined" 
                label="Enter Your Gender"
                value={gender}
                helperText={formError.gender}
                onChange={(event)=>setGender(event.target.value)}
                />
            </Grid>
        <Grid item xs={4}>
                <TextField 
                error={formError.city}
                fullWidth 
                variant="outlined" 
                label="Enter City"
                value={city}
                helperText={formError.city}
                onChange={(event)=>setCity(event.target.value)}/>
            </Grid>
        <Grid item xs={4}>
                <TextField 
                error={formError.mobileno}
                fullWidth 
                variant="outlined" 
                label="Enter Mobile Number"
                helperText={formError.mobileno}
                value={mobileno}
                onChange={(event)=>setMobileNo(event.target.value)}/>
            </Grid>
        <Grid item xs={6}>
                <TextField 
                error={formError.emailID}
                fullWidth 
                variant="outlined" 
                label="Enter Email ID"
                helperText={formError.emailID}
                value={emailID}
                onChange={(event)=>setEmailID(event.target.value)}/>
            </Grid>
        <Grid item xs={6}>
                <TextField 
                error={formError.password}
                fullWidth 
                variant="outlined" 
                label="Enter Password"
                type="password"
                value={password}
                helperText={formError.password}
                onChange={(event)=>setPassword(event.target.value)}/>
            </Grid>
        <Grid item xs={6}>
            <Button 
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            color="success">
                Submit
            </Button>
        </Grid>
        <Grid item xs={6}>
            <Button 
            onClick={()=>handleReset()}
            fullWidth
            variant="contained"
            color="error">
                Reset
            </Button>
        </Grid>
        

        </Grid>
    </div>
    </div>
  
        

    )
}