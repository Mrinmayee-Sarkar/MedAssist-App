import  makeStyles  from "@mui/styles/makeStyles"
import { Grid,InputLabel,MenuItem,Select,FormControl,TextField, Button } from "@mui/material"
import questionimage from "../Assets/question.png"
import Heading from "../Component/Heading"
import { useEffect,useState } from "react"
import { getData, postData,} from "../Services/FetchDjangoServices"
import Swal from "sweetalert2"

const useStyles=makeStyles((theme)=>({
    container: {
        width: "100%",
        height: "91vh",
        background: "#f2f2f2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      box: {
        width: "50%",
        minHeight: "auto",
        background: "#ffff",
        borderRadius: 10,
        padding: "1%",
      }
}))




export default function SubQuestionInterface(){
const [category,setCategory]=useState([])
var doctor=JSON.parse(localStorage.getItem('DOCTOR'))
const [questions,setQuestion]=useState([])
const [subquestionnumber,setSubQuestionNo]=useState(0)
///////////////////////////////////////////////////////////////////
const [questionid,setQuestionID]=useState("")
const [doctorid,setDoctorID]=useState(doctor.id)
const [categoryid,setCategoryId]=useState("")
const [subquestiontext,setSubQuestionText]=useState("")
const [options,setOptions]=useState({})



const handleTextChange=(event,index)=>{
    setOptions({...options,[index+1]:event.target.value})
    console.log(options)
}

const handleReset=()=>{
    setCategoryId(' ')
    setDoctorID(' ')
    setQuestionID(' ')
    setSubQuestionText(' ')
    setSubQuestionNo(0)
    setOptions({})
}

const handleSubmit = async () => {
    var formData = new FormData()
    formData.append('category',categoryid)
    formData.append('doctor',doctorid)
    formData.append('question',questionid,)
    formData.append('subquestiontext',subquestiontext,)
    formData.append('subquestion',Object.values(options)+"")
    formData.append('subquestionno',subquestionnumber.toString())
    
console.log(formData)
var result= await postData("submitsubquestion",formData)

if (result.status){
    Swal.fire({
        icon: 'success',
        title: result.message,
        showConfirmButton: false,
        timer: 2000
      })}
    
else {
    Swal.fire({
        icon: 'error',
        title: result.message,
        showConfirmButton: false,
        timer: 2000
      })}}

const fetchAllCategory = async ()=>{
        var data= await getData("categorylist")
        setCategory(data)
    }

const fetchALLQuestions = async (cid) => {
    var body={id:cid}
    var data= await postData("questionlist",body)
    setQuestion(data)}

const fillQuestions=()=>{
    return questions.map((item)=>{
        return <MenuItem value={item.id}>{item.question}</MenuItem>
    })
}

const handleCategoryChange=(event)=>{
    fetchALLQuestions(event.target.value)
    setCategoryId(event.target.value)

}
const fillCategory=()=>{
    return category.map((item)=>{
        return <MenuItem value={item.id}>{item.categoryname}</MenuItem>
    })}


useEffect(function (){
    fetchAllCategory()
    },[])
const showTextField=()=>{
        var x=new Array(subquestionnumber)
        x.fill(1)
        return x.map((item,index)=>{
            return(
                <Grid item xs={6}>
                    <TextField 
                    onChange={(event)=>handleTextChange(event,index)}
                    label={"Sub Question "+parseInt(index+1)}
                    fullWidth></TextField>
                </Grid>
            )
        })
    }
var classes=useStyles()
    return(
        <div className={classes.container}>
        <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Heading
                    icon={questionimage}
                    text="Sub Questionnaire"
                    color="#079992"/>
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
               <Select 
                label="Category"
                value={categoryid}
                onChange={handleCategoryChange}>
              <MenuItem>Select Category-</MenuItem>
              {fillCategory()}
              </Select>
             </FormControl>
             </Grid>

             <Grid item xs={6}>
                <TextField 
                fullWidth
                label="Enter Doctor ID"
                value={doctorid}
                onChange={(event)=>setDoctorID(event.target.value)}/>
            </Grid>
            <Grid item xs={12}>
             <FormControl fullWidth>
                <InputLabel> Questions</InputLabel>
               <Select 
                label='Questions'
                value={questionid}
                onChange={(event)=>setQuestionID(event.target.value)}>
               <MenuItem>-Select Questions-</MenuItem>
               {fillQuestions()}
               </Select>
              </FormControl>
              </Grid>  
              <Grid item xs={6}>
                <TextField fullWidth
                onChange={(event)=>setSubQuestionText(event.target.value)}
                value={subquestiontext} 
                label="Sub Question Text"/>
                </Grid> 
             <Grid item xs={6}>
             <FormControl fullWidth>
                <InputLabel>Number.Of Questions</InputLabel>
               <Select
               label="No.Of Questions"
               onChange={(event)=>setSubQuestionNo(event.target.value)}>
               <MenuItem value={0}>Select No.of Questions-</MenuItem>
               <MenuItem value={1}>1</MenuItem>
               <MenuItem value={2}>2</MenuItem>
               <MenuItem value={3}>3</MenuItem>
               <MenuItem value={4}>4</MenuItem>
               <MenuItem value={5}>5</MenuItem>
               <MenuItem value={6}>6</MenuItem>
               <MenuItem value={7}>7</MenuItem>
               <MenuItem value={8}>8</MenuItem>
                
               </Select>
              </FormControl>
              </Grid>   
              <Grid item xs={12} container spacing={3}>
                {showTextField()}
              </Grid>
              <Grid item xs={6}>
                <Button 
                fullWidth
                variant="contained"
                color="success"
                onClick={handleSubmit}>
                    Submit
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button 
                fullWidth
                variant="contained"
                color="error"
                onClick={()=>handleReset()}>
                    Reset
                </Button>
              </Grid>
              </Grid>
            
    </div>
        </div>
    )

}
