import  makeStyles  from "@mui/styles/makeStyles"
import { useState,useEffect } from "react"
import { getData } from "../Services/FetchDjangoServices"
import DoctorCard from "../Component/DoctorCard"
import { ArrowForwardIos } from "@mui/icons-material"
import IconButton from '@mui/material/IconButton';
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
const useStyles=makeStyles((theme)=>({
    container:{
        width:"100%",
        height:"91vh",
        display:"flex",
        justifyContent:"center",
    },
    box:{
        width:"auto",
        height:'auto',
        background:"#ffff",
        borderRadius:10,
        padding:"1%"  }
}))

export default function ListOfDoctors(props){
const [doctor,setDoctor]=useState({})
const [doctors,setDoctors] = useState([])
const[temp,setTemp]=useState([])
const[selectedDoctor,setSelectedDoctor]=useState(-1)
var navigate=useNavigate()
var dispatch=useDispatch()

const fetchAllDoctors = async()=>{
    var result= await getData("doctorlist")
    setDoctors(result)
    setTemp(result)
}
useEffect(function () {
    fetchAllDoctors()},[])

const SearchDoctors=()=>{
    if(props.pattern.length!==0){
    const data=doctors.filter((item)=>{
        return  (item.doctorname.toLowerCase()).includes(props.pattern)
    })
    setDoctors(data)
}
else{
    setDoctors(temp)}}

useEffect(function(){
    SearchDoctors()},[props] )

const showDoctors=()=>{
    return doctors.map((item,i)=>{
        return <DoctorCard key={item.id} setDoctor={setDoctor} data={item} i={i} selectedDoctor={selectedDoctor} setSelectedDoctor={setSelectedDoctor}/>
})
}
const handleDoctor=()=>{
    if (selectedDoctor===-1){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Select Doctor',
            toast:true
          })}
    else{props.setStatus(false) 
        dispatch({type:"ADD_Doctor",payload:[doctor]})
         navigate("/patientdashboard/selecteddoctor")
    }
    
}
var classes=useStyles()
     return (
        <div className={classes.container}>
            <div className={classes.box}>
                <div style={{display:"flex",alignItems:'center',width:'95%'}}>
            <IconButton onClick={handleDoctor} style={{marginLeft:'auto',background:"#22a6b3",width:75,height:75}}>
            <ArrowForwardIos style={{color:"#fff",fontSize:36,fontWeight:"bold"}} />
            </IconButton>
            </div>
             <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',marginTop:20}}>{showDoctors()}</div>   
            </div>
        
        </div>
    )
}