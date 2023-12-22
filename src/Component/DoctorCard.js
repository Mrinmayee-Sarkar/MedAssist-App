import { Paper,Button } from "@mui/material"
import { imageURL,serverURL } from "../Services/FetchDjangoServices"
export default function DoctorCard(props){
const handleClick=(index)=>{
    props.setSelectedDoctor(index)
    props.setDoctor(props.data)
}
    return (
        <Paper onClick={()=>handleClick(props.i)} elevation={2} style={{background:props.i==props.selectedDoctor?"#f7f1e3":"#ffff",width:200,height:'auto',margin:'0px 0px 15px 15px',padding:10}}>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <img src={`${imageURL}${props.data.photograph}`} 
                style={{width:100,height:100,borderRadius:50}}></img></div>
            <div style={{fontFamily:"kanit",fontSize:18,fontWeight:'bold',textAlign:'center',marginTop:10}}>
                Dr. {props.data.doctorname}
            </div>
            <div style={{fontFamily:'kanit',fontSize:12,fontWeight:'bold',textAlign:'center',marginTop:5}}>
                {props.data.qualification}
            </div>
            <div style={{fontFamily:'kanit',fontSize:10,fontWeight:'bold',textAlign:'center',marginTop:5}}>
                {props.data.emailid}
            </div>
            
            </Paper>
    )
}