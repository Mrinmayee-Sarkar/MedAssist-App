import MaterialTable from "@material-table/core"
import { postData } from "../Services/FetchDjangoServices"
import { useEffect, useState } from "react"
import  makeStyles  from "@mui/styles/makeStyles"
import { useNavigate } from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button,Grid } from "@mui/material"
const useStyles=makeStyles((theme)=>({
  container:{
    width:'100vw',
    height:'90vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    position:"relative",
  },
  box:{
    width:1000,
    height:'50%',
    background:'#fff',
    borderRadius:10,
    padding:10,
    marginRight:"20%",
    marginBottom:'7%'
   
  },
  rootContainer:{
    width:"50vw",
    height:"85vh",
    background:"#f2f2f2",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  rootBox:{
    width:800,
    height:500,
    padding:10,
    borderRadius:10,
    margin:15,
    background:"#fff"
  }
}))
export default function PatientDisplay(){
const[patientlist,setPatientList]=useState([])
const [open,setOpen]=useState(false)
const [selectedPatient,setSelectedPatient]=useState({})
var doctor=JSON.parse(localStorage.getItem("DOCTOR"))
var classes=useStyles()
var navigate=useNavigate()

const handleQuestions=(rowData)=>{
setSelectedPatient(rowData)
//console.log("NNNN",rowData)
setOpen(true)}

const fetchAllPatients= async()=>{
    var body={'doctorid':doctor.id}
    var result=await postData("answerlist",body)
    setPatientList(result) }
 
    useEffect(function ()
 {fetchAllPatients()},[])

 const handleAdd =()=>{
 setOpen(false)
 navigate("/doctordashboard/prescription",{state:{patient:JSON.stringify(selectedPatient)}})
 }

 const handleClose=()=>{
  setOpen(false)
 }

 const handlePrescription=(rowData)=>{
 
  navigate("/doctordashboard/prescriptiondisplay",{state:{patient:JSON.stringify(rowData)}})
  //console.log("Bye",{state:{patient:JSON.stringify(rowData)}})
 }
 
 const putAnswers=(data)=>{
//console.log("MMMMMMMMMMMMMMMMMMMMM",typeof(data))
if (data!==undefined){
  return Object.values(JSON.parse(data))?.map((item,i)=>{
    return(
      <tr>
        <th>{i+1}</th>
        <th>{item.Q}</th>
        <th>{item.SQ}</th>
        <th>{item.ans.value}</th>
      </tr>
      
    )
  })
}
else{
 return  <></>
}
}

 const displayAnswers=()=>{
  return(
    <div className={classes.rootContainer}>
      <div className={classes.rootBox}>
        <div style={{display:'flex',alignItems:"center",justifyContent:"center"}}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div style={{fontFamily:"kanit",fontSize:25,fontWeight:"bolder",color:"crimson", textAlign:"center"}}>Patient Answers</div>
        </Grid>
       <Grid item xs={12}>
       <div style={{fontFamily:"kanit",fontSize:20,fontWeight:"bolder",}}>{selectedPatient?.patient?.PatientName}</div>
       <div style={{fontFamily:"kanit",fontSize:16,fontWeight:400,}}>{selectedPatient?.patient?.Age} Year, {selectedPatient?.patient?.Gender}</div>
       </Grid>
       <Grid item xs={12}>
                        <div style={{display:'flex',margin:"0px 15px 15px 15px",padding:5,alignItems:"center",flexDirection:'column'}}>
                        <div style={{color:"crimson",fontFamily:"kanit",fontWeight:"bolder",fontSize:20,alignSelf:"flex-start",marginLeft:"9%"}}>Answers</div><br></br>
                        <table cellSpacing="0" cellPadding="5" border="1" width="600" >
                          <tbody>
                          <tr>
                            <th>Sno</th>
                            <th>Question</th>
                            <th>Sub Question</th>
                            <th>Answer</th>
                          </tr>
                        {putAnswers(selectedPatient?.ansdata)}
                        </tbody>
                        </table>
                       
                        </div></Grid></Grid>
      </div>
      </div>
      </div>
  )}
  

function showAnswers(){
  return(
    <div>
      <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      maxWidth={"md"}>
  <DialogContent>
    {displayAnswers()}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleAdd}>Add Prescription</Button>
  </DialogActions>
</Dialog>
</div>)}


  
function showPatientList() {
  return (
    <MaterialTable
      title="Patient List"
      columns={[
        { title: 'Email ID',render:(rowData)=>`${rowData.patient.EmailId}` },
        { title: 'Mobile No',render:(rowData)=>`${rowData.patient.Mobileno}`},
        { title: 'Name',render:(rowData)=>`${rowData.patient.PatientName}`},
        { title: 'Current Date', field: 'currentdate' },
        { title: 'Current Time', field: 'currenttime'},
       
       ]}
       data={patientlist}

         
      actions={[
          {icon: 'medication',
          tooltip: 'Show Patient Anwers',
          onClick:(event,rowData)=>handleQuestions(rowData)},
          
            {icon: 'assignment',
            tooltip: 'Show Prescription',
            onClick:(event,rowData)=>handlePrescription(rowData)}
             ]}/> )}

return(
  <div className={classes.container}>
    <div className={classes.box}>
  {showPatientList()}</div>
  {showAnswers()}</div>
)
}