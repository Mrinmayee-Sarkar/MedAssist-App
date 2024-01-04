import makeStyles from "@mui/styles/makeStyles";
import Options from "../Component/Options";
import { useState,useEffect } from "react";
import {postData,imageURL } from "../Services/FetchDjangoServices";
import { Button } from "@mui/material";
import { NavigateBefore } from "@mui/icons-material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";
const useStyles=makeStyles((theme)=>({
    container:{
        width:"auto",
        height:"91vh",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        fontFamily:"kanit",
        position:'relative'

    },

    header:{
        width:"1270px",
        height:"100px",
        background:"#22a6b3",
        display:"flex",
        alignItems:'center',
        marginTop:'3px',   
        borderBottomLeftRadius:'40px',
        WebkitBorderBottomRightRadius:'40px'

    },
    text1:{
        fontSize:'30px',
        marginLeft:10,
        marginTop:20
    },
    text2:{
        fontSize:25,
        marginLeft:20,
        display:'flex',
        marginTop:50,
        marginLeft:20

    },
    box:{
        background:'#D4E6F1',
        width:'1200px',
        height:'500px',
        marginTop:'8px',
        display:'flex',
        flexDirection:'column',
    }
   
}))
export default function PatientQuestioner(){
var classes=useStyles()
var dispatch=useDispatch()
const[index,setIndex]=useState(0)
const[question,setQuestion]=useState([])
const[selectedOption,setSelectedOption]=useState({})
const [Razorpay]=useRazorpay()


var doctor=useSelector((state)=>state.doctor)
var patient=useSelector((state)=>state.patient)
var answers=useSelector((state)=>state.answer)  

var patientdata=Object.values(patient)[0] 
const[doctorId,setDoctorID]=useState(doctor.id)
const[patientId,setPatientID]=useState(patientdata.EmailId)
const fetchALLQuestions=async ()=>{
    var body={doctorid:doctor.id}
    var result=await postData("doctorquestions",body )
    console.log("QQQQQQQQQQQQQQQ",result.data)
    setQuestion(result.data)}

    useEffect( function(){
        fetchALLQuestions()
      },[])

const handleNext=(i,mq,sq)=>{
   var i=index+1
   if(question.length>0 && i<question.length)
  { var body={"Q":mq,"SQ":sq,"ans":selectedOption}
     dispatch({"type":"ADD_Answer","payload":["Q"+i,body]})
   setIndex(i)}
   
  else
  {
  console.log("Answerssssss",answers)  
  var body={"Q":mq,"SQ":sq,"ans":selectedOption}
     dispatch({"type":"ADD_Answer","payload":["Q"+i,body]})

submitRecord()}
}
const handlePrev=(i,mq,sq)=>{
     i=index
    if(i>0)
    {var i=index-1
        var body={"Q":mq,"SQ":sq,"ans":selectedOption}
        dispatch({"type":"ADD_Answer","payload":[("Q"+i),body]})
    setIndex(i)}
    else
    alert('Press Next')

}

const submitRecord=()=>{
    Swal.fire({
        title: "Make payment of Rs 200/- only",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Make Payment",
        denyButtonText: `Deny Payment`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
         handlePayment()
        } else if (result.isDenied) {
          Swal.fire("Please Make Payment", "", "info");
        }
      });
}
    const handlePayment = useCallback(async(na) => {
     
        const options = {
          key: "rzp_test_GQ6XaPC6gMPNwH",
          amount: 20000,
          currency: "INR",
          name: 'MedAssist',
          description: "Online Payments",
          image: `${imageURL}/static/logo192.png`,
         
          handler: (res) => {
            console.log("Payment Details",res);
            handleSubmit()  
          },
          prefill: {
            name: patientdata.username,
            email: patientdata.emailid,
            contact: patientdata.mobileno,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
    
        const rzpay = new Razorpay(options);
        rzpay.open();
      }, [Razorpay]);
    


const handleSubmit= async()=>{
    var body={"doctor":doctorId,'patient':patientId,'currentdate':`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,'currenttime':`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,'ansdata':JSON.stringify(answers)};
    var result=await postData("submitanswer",body)
    console.log(body)

    if (result.status){
        Swal.fire({
            icon: 'success',
            title: result.message,
            showConfirmButton: false,
            timer: 2000
             })}
        else{
            (Swal.fire({
                icon: 'error',
                title: result.message,
                showConfirmButton: false,
                timer: 2000
                 }))}}



 const showQuestions=()=>{
return(
    <div className={classes.container}>
        <div className={classes.header}>
        <div className={classes.text1}>Patient Questioner Index {index+1}/{question?.length}</div></div>
        <div style={{display:'flex',flexDirection:'column'}}>
            <div className={classes.text2}>Ques{index+1}:{question[index]?.question?.question}</div></div>
            <div className={classes.box}>
                <div style={{width:'150px',height:'40px',fontSize:20,marginTop:'5px',marginLeft:'10px',fontWeight:'bolder'}}> {question[index]?.subquestiontext}</div>
              {question[index]?.subquestion?<Options options={question[index]?.subquestion} setSelectedOption={setSelectedOption}/>:<></>}
                </div>
    <div style={{display:'flex',justifyContent:"space-between",alignItems:'center',width:1100 }}>
    <Button onClick={()=>handlePrev(index+1,question[index]?.question?.question,question[index]?.subquestiontext)} style={{background:"#22a6b3",fontSize:26,fontFamily:'kanit',fontWeight:"bolder",borderRadius:'50px',padding:'10px',width:'200px',marginTop:'20px',alignItems:'center',justifyContent:'center',display:'flex',color:'white'}}  variant="contained" >Previous<NavigateBefore /></Button>
    <Button onClick={()=>handleNext(index+1,question[index]?.question?.question,question[index]?.subquestiontext)} style={{background:"#22a6b3",fontSize:26,fontFamily:'kanit',fontWeight:"bolder",borderRadius:'50px',padding:'10px',width:'200px',marginTop:'20px',display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}  variant="contained" >Next<NavigateNextIcon/></Button>
        </div></div>
)}
return(
    <div>{showQuestions()}</div>
)
}