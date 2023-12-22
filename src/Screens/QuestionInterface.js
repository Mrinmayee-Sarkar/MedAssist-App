import  makeStyles  from "@mui/styles/makeStyles"
import { Grid,InputLabel,Select,FormControl, MenuItem,TextField, Button } from "@mui/material"
import Heading from "../Component/Heading"
import questionimage from "../Assets/question.png"
import { useEffect,useState } from "react"
import { getData, postData } from "../Services/FetchDjangoServices"
import Swal from "sweetalert2"
import { useSelector } from "react-redux"

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
      },}))

export default function QuestionInterface(){
var doctor=JSON.parse(localStorage.getItem("DOCTOR")) 
const [category,setCategory]=useState([])
const[categoryid,setCategoryId]=useState(doctor.category)
const[question,setQuestion]=useState(" ")
const[doctorid,setDoctorID]=useState(doctor.id)



const fetchAllCategory = async() => {
    var data= await getData("categorylist")
    setCategory(data)}
const fillCategory = () => {
    return category.map((item) => {
        return <MenuItem value={item.id}>{item.categoryname}</MenuItem>})}

const handleSubmit = async () => {
    var formData = new FormData()
    
    formData.append('category',categoryid)
    formData.append('doctor',doctorid)
    formData.append('question',question)
console.log(formData)

    var result = await postData("submitquestion",formData)
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
             }))}
}

const handleReset=()=>{
    setCategoryId(" ")
    setDoctorID(" ")
    setQuestion(" ")
}

useEffect(function (){
    fetchAllCategory()
},[])
var classes=useStyles()
return(
    <div className={classes.container}>
    <div className={classes.box}>
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Heading
                icon={questionimage}
                text="Questionnaire"
                color="#079992"/>
            </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select 
          label="Category" 
          value={categoryid}
          onChange={(event) => setCategoryId(event.target.value)}>
          <MenuItem>-Select Category-</MenuItem>
          {fillCategory()}
        </Select>
        </FormControl>
        </Grid>
        <Grid item xs={6}>
        <TextField 
        fullWidth
         label="Enter Doctor ID"
         value={doctorid}
         onChange={(event) =>setDoctorID(event.target.value)}/>
        </Grid>
        <Grid item xs={12}>
        <TextField
        fullWidth 
         label="Enter Questions"
         value={question}
         onChange={(event) =>setQuestion(event.target.value)}/>
        </Grid>
        <Grid item xs={6}>
        <Button
         color="success"
         fullWidth
         variant="contained"
         onClick={handleSubmit}>
         Submit
        </Button>
        </Grid>
        <Grid item xs={6}>
        <Button
        onClick={()=>handleReset()}
         color="error"
         fullWidth
         variant="contained">
         Reset
        </Button>
        </Grid>
       </Grid>

    </div>
    </div>
)


}