import {useEffect,useState,} from 'react'
import MaterialTable from '@material-table/core';
import { getData,imageURL,serverURL,postData } from '../Services/FetchDjangoServices';
import { Avatar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import addimage from "../Assets/adddoctor.png"
import doctorimage from"../Assets/doctors.png"


import {FormHelperText,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,

} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Heading from "../Component/Heading";
import Swal from "sweetalert2";
import { SettingsOverscan } from '@mui/icons-material';


const useStyles = makeStyles((theme) => ({
  rootcontainer: {
    width: "auto",
    height: "auto",
    
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rootbox: {
    width: "auto",
    height: "auto",
    background: "#fff",
    borderRadius: 10,
    padding: 15,
  },
    container: {
        width: "100vw",
        height: "90vh",
        display: "flex",
        background:'"#f2f2f2"'
        },
    box: {
      width: 1000,
      height: "80%",
      background: "#fff",
      borderRadius: 10,
      padding: 15,
      marginLeft:"10%",
      marginTop:"2%"
        },
      }));
      export default function DisplayAll(){
        const[doctorlist,setDoctorlist]=useState([])
        const[open,setOpen]=useState(false)
        const[over,setOver]=useState(false)
    /*************************************************************/
  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [dob, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [stateid, setStateId] = useState("");
  const [cityid, setCityId] = useState("");
  const [qualification, setQualification] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [password, setPassword] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [photograph, setPhotograph] = useState({ url: "", bytes: "" });
  const [btnStatus, setBtnStatus] = useState(false);
  const [tempPicture, setTempPicture] = useState('');

  const[formError,setFormError]=useState({})
  const handleError=(error,label)=>{
    setFormError((prev)=>({...prev,[label]:error}))}
    const isError=()=>{
      var error=false
      if(categoryId.length==0)
      {handleError('Select Category','categoryid')
        error=true
      }
      if(doctorName.length==0)
      {handleError('Doctor Name Should Not Be Blank','doctorname')
        error=true
      }
      if(dob.length==0)
      {handleError('Enter Date OF Birth','dob')
        error=true
      }
      if(gender.length==0)
      {handleError('Select Gender','gender')
        error=true
      }
      if(address.length==0)
      {handleError('Address Should Not Be Blank','address')
        error=true
      }
      if(stateid.length==0)
      {handleError('Select State','stateid')
        error=true
      }
      if(cityid.length==0)
      {handleError('Select City','cityid')
        error=true
      }
      if(qualification.length==0)
      {handleError('Pls Enter Qualification','qualification')
        error=true
      }
      if(emailId.length==0 || !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(emailId))
      {handleError('Pls Enter Correct Email Id','emailid')
        error=true
      }
      if(mobileno.length==0 ||!(/^[0-9]{10}$/).test(mobileno))
      {handleError('Pls Enter Correct Mobile No.','mobileno')
        error=true
      }
     /* if(photograph.bytes.length==0)
      {handleError('Pls Upload Picture','photograph')
        error=true
      }*/
      return error
    }
  
  
    
    const fetchAllStates = async () => {
      var data = await getData("statelist");
      setStates(data);
    };
    const fetchAllCategory = async () => {
      var data = await getData("categorylist");
      setCategory(data);
    };
  
    const fillStates = () => {
      return states.map((item) => {
        return <MenuItem value={item.id}>{item.statename}</MenuItem>;
      });
    };
    const fillCategory = () => {
      return category.map((item) => {
        return <MenuItem value={item.id}>{item.categoryname}</MenuItem>;
      });
    };
  
    const fetchAllCity = async (sid) => {
      var body = { id: sid };
  
      var data = await postData("citylist", body);
      setCity(data);
    };
    const fillCity = () => {
      return city.map((item) => {
        return <MenuItem value={item.id}>{item.cityname}</MenuItem>;
      });
    };
  
    const handleStateChange = (event) => {
      fetchAllCity(event.target.value);
      setStateId(event.target.value);
    };
  
    useEffect(function () {
      fetchAllStates();
      fetchAllCategory();
    }, []);
  
    const handlePhotograph = (event) => {
      setPhotograph({
        url: URL.createObjectURL(event.target.files[0]),
        bytes: event.target.files[0],
      });
    };
    const handleSubmit = async () => {
      if (isError()==false){
      var body={"id":doctorId,"category":categoryId,"doctorname": doctorName,"gender":gender,"dob":dob,"address":address,"states":stateid,"city": cityid,"qualification":qualification,"emailid":emailId,"mobileno": mobileno,"photograph": photograph.bytes}
      var result = await postData("doctoredit", body);
      if(result.status){
        Swal.fire({
        icon: 'success',
        title: result.message,
        showConfirmButton: false,
        timer: 2000 })
        fetchAllDoctor()}

      else
        {(Swal.fire({
          icon: 'error',
          title: result.message,
          showConfirmButton:false,
          timer: 2000
        })) } 
     
  
    }};
    /************************************************************************** */
        const fetchAllDoctor = async () => {
        var result = await getData("doctorlist");
        setDoctorlist(result);
       };
      useEffect(function () {
       fetchAllDoctor();
  
      }, []);
        var classes = useStyles()
      const handleClose=()=>{
        setOpen(false)
      }  
      const handleEdit=(rowData)=>{
        fetchAllCity(rowData.states.id)
        setDoctorId(rowData.id)
        setCategoryId(rowData.category.id)
        setDoctorName(rowData.doctorname)
        setDOB(rowData.dob)
        setAddress(rowData.address)
        setStateId(rowData.states.id)
        setCityId(rowData.city.id)
        setGender(rowData.gender)
        setQualification(rowData.qualification)
        setMobileno(rowData.mobileno)
        setEmailId(rowData.emailid)
        setPhotograph({ url: `${imageURL}${rowData.photograph}`, bytes:" "})
        setTempPicture(`${imageURL}${rowData.photograph}`)
        setOpen(true)}

      const handleDelete=(rowData)=>{
        Swal.fire({
          title: `Do you want to delete DR.${rowData.doctorName} registration?`,
          showDenyButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          if (result.isConfirmed) {
            var body={'id':rowData.id}
            var result=await postData('doctordelete',body)
            if (result.status){
              Swal.fire('Deleted!'," ","success")
              fetchAllDoctor()}
              else{
                Swal.fire('Server Error!'," ","error")}}
              else if (result.isDenied){
                Swal.fire('Record Not Deleted', '', 'info')}})


      }

      const handleEditPicture=async()=>{
        var formData=new FormData()
        formData.append('id',doctorId)
      formData.append('photograph',photograph.bytes)
      var result=await postData('editdoctorimage',formData)
      if(result.status){
        Swal.fire({
        icon: 'success',
        title: result.message,
        showConfirmButton: false,
        timer: 5000,
      })
      fetchAllDoctor()
      setBtnStatus(false)}
      else
        {Swal.fire({
          icon: 'error',
          title: result.message,
          showConfirmButton:false,
          timer: 5000
        }) } }
 const saveCancel=()=>{
  return(<div>
    <Button onClick={handleEditPicture}>Save</Button>
    <Button onClick={handleCancel}>Cancel</Button>
    </div>
 )}
 const handleCancel=()=>{
  setPhotograph({url:tempPicture,bytes:" "})
  setBtnStatus(false)
 }

      const showDoctor=()=>{
        return (
          <div className={classes.rootcontainer}>
            <div className={classes.rootbox}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Heading
                    color="#079992"
                    icon="Doctor.webp"
                    text="Doctor Register"
                  /></Grid>
                
                <Grid
                 item 
                 xs={12}
                 style={{display:'flex',
                 alignItems:'center', 
                 justifyContent:'right'}}>
                  <Button style={{position:'relative',background:"#ffff"}} variant="text" component="label">
                  <input
                    error={formError.photograph}
                    onFocus={()=>handleError('',"photograph")}
                    onChange={handlePhotograph}
                      type="file"
                      hidden
                      accept="image/*"
                      multiple/>
                    {over?<div style={{display:'flex',justifyContent:'center',alignItems:'center',bottom:3,left:3,position:'absolute',width:26,height:26,borderRadius:13,background:'#f2f2f2',zIndex:2}}><EditRoundedIcon style={{color:'#000',fontsize:16}}/></div>:<></>}
                  <Avatar
                  onMouseOver={()=>setOver(true)}
                  onMouseLeave={()=>setOver(false)}
                   alt="Doctor Image"
                   src={photograph.url}
                   variant="circular"
                   sx={{ width: 80, height: 80 }}
                 />
                 </Button>
                 {btnStatus?saveCancel():<></>}

               </Grid>
                 

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      value={categoryId}
                      error={formError.categoryid}
                      onFocus={()=>handleError('','categoryid')}
                      onChange={(event) => setCategoryId(event.target.value)}
                    >
                      <MenuItem>-Select Category-</MenuItem>
                      {fillCategory()}
                    </Select>
                    
                   {formError.categoryid? <FormHelperText style={{color:'red'}}>{formError.categoryid}</FormHelperText>:<></>}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    error={formError.doctorname}
                    onFocus={()=>handleError('','doctorname')}
                    onChange={(event) => setDoctorName(event.target.value)}
                    label="Doctor Name"
                    helperText={formError.doctorname}
                    fullWidth
                    value={doctorName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        error={formError.gender}
                        onFocus={()=>handleError('','gender')}
                        value='Female'
                        control={<Radio />}
                        label="Female"
                        checked={gender=="Female"?true:false}
                        onChange={(event) => setGender(event.target.value)}
                      />
                      <FormControlLabel
                      error={formError.gender}
                      onFocus={()=>handleError('','gender')}
                        value='Male'
                        control={<Radio />}
                        label="Male"
                        checked={gender=="Male"?true:false}
                        onChange={(event) => setGender(event.target.value)}
                      />
                      <FormControlLabel
                      error={formError.gender}
                      onFocus={()=>handleError("","gender")}
                        value='Other'
                        control={<Radio />}
                        label="Other"
                        checked={gender=="Other"?true:false}

                        onChange={(event) => setGender(event.target.value)}
                      />
                    </RadioGroup>
                    {formError.gender? <FormHelperText style={{color:'red'}}>{formError.gender}</FormHelperText>:<></>}
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                  error={formError.dob}
                  onFocus={()=>handleError("","dob")}
                  helperText={formError.dob}
                    onChange={(event) => setDOB(event.target.value)}
                    value={dob}
                    type="date"
                    label="Date of Birth"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                  error={formError.address}
                  onFocus={()=>handleError('',"address")}
                  helperText={formError.address}
                    onChange={(event) => setAddress(event.target.value)}
                    label="Address"
                    fullWidth
                    value={address}
                  />
                </Grid>
      
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select 
                    value={stateid}
                    error={formError.stateid}
                    onFocus={()=>handleError('','stateid')}
                    onChange={handleStateChange} 
                    label="State">
                      <MenuItem>-Select State-</MenuItem>
                      {fillStates()}
                    </Select>
                    {formError.stateid? <FormHelperText style={{color:'red'}}>{formError.stateid}</FormHelperText>:<></>}
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>City</InputLabel>
                    <Select
                    value={cityid}
                      error={formError.cityid}
                      onFocus={()=>handleError('','cityid')}
                      label="City"
                      onChange={(event) => setCityId(event.target.value)}>
                      <MenuItem>-Select City-</MenuItem>
                      {fillCity()}
                    </Select>
                    {formError.cityid? <FormHelperText style={{color:'red'}}>{formError.cityid}</FormHelperText>:<></>}
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                  value={qualification}
                  error={formError.qualification}
                  onFocus={()=>handleError('',"qualification")}
                  helperText={formError.qualification}
                    onChange={(event) => setQualification(event.target.value)}
                    label="Qualification"
                    fullWidth/>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                  value={emailId}
                  error={formError.emailid}
                  onFocus={()=>handleError('',"emailid")}
                  helperText={formError.emailid}
                    label="Email Id"
                    fullWidth
                    onChange={(event) => setEmailId(event.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                  value={mobileno}
                  error={formError.mobileno}
                  onFocus={()=>handleError('',"mobileno")}
                  helperText={formError.mobileno}
                    onChange={(event) => setMobileno(event.target.value)}
                    label="Mobile Number"
                    fullWidth/>
                </Grid>
               
                
              </Grid>
            </div>
          </div>);}
      const showdoctordetails=()=>{
        return (
          <div>
            <Dialog
              open={open}
              keepMounted
              onClose={handleClose}
              maxWidth={'md'}>
              <DialogContent>
                {showDoctor()}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleSubmit}>Edit Data</Button>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          </div> );}
      function showdoctorlist() {
        return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Heading 
              text="Doctor Register"
              linkimage={addimage}
              link={"/admindashboard/doctorsinterface"}
              color="#079992"
              icon={doctorimage}
              /></Grid>
        <Grid item xs={12}>
          <MaterialTable
            title=""
            columns={[
              { title: 'Doctor',render:(rowData)=><div><div>{rowData.id}/{rowData.doctorname}</div><div>{rowData.gender}</div></div> },
              { title: 'Specialization',render:(rowData)=><div>{rowData.category.categoryname}</div> },
              { title: 'Birth', field: 'dob'},
              { title: 'Qualification', field: 'qualification'},
              {title:'Address',render:(rowData)=><div><div>{rowData.address}</div><div>{rowData.city.cityname},{rowData.states.statename}</div></div>},
              {title:'Photograph',render:(rowData)=><div><Avatar src={`${imageURL}${rowData.photograph}`} /></div>} ]}
            data=
              {doctorlist}   
            options={{
              paging:true,
              pageSize:3,
              emptyRowsWhenPaging:false,
              pageSizeOptions:[3,5,10]}}  
            actions={[
              {icon: 'edit',
                tooltip: 'Edit User',
                onClick: (event, rowData) => handleEdit(rowData)},
              {icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, rowData) => handleDelete(rowData)}]}/></Grid></Grid>)}
                
    return (
        <div className={classes.container}>
      <div className={classes.box}>
      {showdoctorlist()}</div>
      {showdoctordetails()}
      </div>)}