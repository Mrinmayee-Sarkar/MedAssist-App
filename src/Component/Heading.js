import { useNavigate } from "react-router-dom"
export default function Heading({icon,text,color,link,linkimage})
{ var navigate=useNavigate()
    return(
    <div style={{display:'flex',padding:5, fontFamily:'Barlow Condensed',fontWeight:'bold',fontSize:25,color:color}}>
    <img src={icon} width='30'/>
    <div style={{marginLeft:5}}>{text}</div>
    <div onClick={()=>navigate(link)} style={{marginLeft:"auto"}}><img src={linkimage} width='30'></img> </div></div>

    )
}