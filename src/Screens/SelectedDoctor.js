import { Button, Grid,Avatar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector } from "react-redux";
import { imageURL } from "../Services/FetchDjangoServices";
import { useNavigate } from "react-router-dom";
const useStyles=makeStyles((theme)=>({
   container: {
        width:"100v%",
        height:"100%",
        background:"#fff",
        fontFamily:'Kanit',
        overflowY:'hidden',
        fontWeight:"bold" }
    ,
    header:{
        width:"100%",
        height:'12%',
        background: "#22a6b3",
        color:"#fff",
        borderRadius:"0px 0px 25px 25px",
        display:'flex',
        alignItems:"center",
        marginTop:2,
        fontSize:30
        
},
    text1:{
        marginLeft:20,},
    bigBox:{
        width:"95%",
        height:"auto",
        background:'#D4E6F1',
        margin:20,
        display:'flex',
        flexDirection:"column",
        padding:"1%",
        },
    text2:{
       
        marginLeft:20,
        fontSize:25,
        color:'#154360',
        fontWeight:'bold'},
    text3:{
        display:'flex',
        margin:"20px 20px 0px 20px",
        fontSize:20
},
    text4:{
        color:'#154360',
        marginLeft:20,
        fontSize:20,
        display:'flex'
    },
    box2:{
        width:"95%",
        background:'#D4E6F1',
        margin:20,
        padding:10,

    }
}

))
export default function SelectedDoctor() {
    var classes=useStyles()
    var doctor=useSelector(state=>state.doctor)
    var navigate=useNavigate()
    const handleClick=()=>{
        navigate("/patientdashboard/patientquestioner")

    }
 return(
    <div className={classes.container}>
        <div className={classes.header}>
            <div className={classes.text1}>Medassist {doctor.category.categoryname} Index</div>
        </div>
        <div className={classes.bigBox}>
            <div className={classes.text2}>Instructions</div>
            <div className={classes.text3}>In section A,B and C,questions will be asked about your hip or knee pain.Please mark each response with an X</div>
            <div className={classes.text3}>if you are unsure about how to answer a question,please give the best answer you can.</div>
            <div style={{display:'flex',marginTop:10,marginLeft:20,marginRight:20,marginBottom:10,padding:20,justifyContent:"center"}}>
                <Button onClick={handleClick}
                style={{ variant:"contained" ,display:'flex',alignItems:"center",borderRadius:100,background:"#22a6b3",marginTop:10,height:40,color:'#ffff',fontSize:20,paddingLeft:50,paddingRight:50}}>START MEDASSIST SURVEY</Button></div>
        </div>
        <div style={{display:'flex',flexDirection:'column',marginTop:'5%'}}>
        <div className={classes.text4}>Your Doctor</div>
        <div className={classes.box2}>
            <Grid container>
                <Grid item xs={1}>
                <Avatar alt="Remy Sharp" src={`${imageURL}${doctor.photograph}`} sx={{ width: 80, height: 80 }} />
                 </Grid>
                 <Grid item xs={11}>
                 <div style={{display:'flex',marginBottom:10,color:'#154360',fontWeight:'bold',fontSize:30}}>
                 Dr.{doctor.doctorname}</div>
            <div><Button style={{ variant:"contained" ,borderRadius:100,background:"#22a6b3",height:40,color:'#ffff',fontSize:15,paddingLeft:30,paddingRight:30}}>Change Doctor</Button></div>
        </Grid>
        </Grid>
        </div>

        </div>

        </div>


 )

}
 
    