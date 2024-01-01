export default function TimeHeading({text,color,icon})
{
    return(
        <div style={{display:'flex',padding:5, fontFamily:'Barlow Condensed',fontWeight:'bold',fontSize:25,color:color}}>
        <img alt=" "src={icon} width='40'/>
        <div style={{marginLeft:5}}>{text}</div></div>
    
        )
}