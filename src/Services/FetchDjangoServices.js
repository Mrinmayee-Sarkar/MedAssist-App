import axios from "axios"
var serverURL='http://127.0.0.1:8000/api'
var imageURL='http://127.0.0.1:8000'

const getData=async(url)=>{
  try{  
    var response= await axios.get(`${serverURL}/${url}`)
    var data=response.data
    return(data)
  }
  catch(e)
  { console.log(e)
    return null
  }
}

const postData=async(url,body)=>{
  try{  
    var response= await axios.post(`${serverURL}/${url}`,body)
    var data=response.data
    return(data)
  }
  catch(e)
  { 
    return null
  }
}
export {getData,serverURL,postData,imageURL}