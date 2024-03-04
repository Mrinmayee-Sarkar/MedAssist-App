import  makeStyles  from "@mui/styles/makeStyles"
import { useState } from "react"

const useStyles=makeStyles((theme)=>({
    container:
    {
        width:'1100px',
        height:'100px',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-evenly',
        fontFamily:'kanit'
    },
    box:{
        height:'65px',
        width:'90px',
        
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        cursor:'pointer',
        fontFamily: "kanit",
        borderRadius:10,
        background:'#D4E6F1'
    }
}))

export default function Options(props)

{
  var options=(props?.options).split(",") 
    const [selectedOptions, setSelectedOptions] = useState([]);
    var classes=useStyles()
    const handleClick = (index) => {
      setSelectedOptions((prevSelected) => {
        if (prevSelected.includes(index)) {
          return prevSelected.filter((item) => item !== index);
        } else {
          return [...prevSelected, index];
        }
      });
    };
    return (
        <div className={classes.container}>
          
          {options.map((item,index)=>(
           <div
           key={index}
           className={classes.box}
           onClick={() => handleClick(index)}
           style={{
             backgroundColor: selectedOptions.includes(index) ? "#22a6b3" : "white",
           }}
         >
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:2}}>
              <div>{item}</div>
            </div></div>))
        }
       </div>
      );
}