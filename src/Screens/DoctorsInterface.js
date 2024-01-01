import { useEffect, useState } from "react";
import {
  FormHelperText,
  Avatar,
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
import { getData, postData } from "../Services/FetchDjangoServices";
import doctorimage from "../Assets/doctors.png"
import alldoctorimage from "../Assets/alldoctor.png"

const useStyles = makeStyles((theme) => ({
  container: {
    width: "80vw",
    height: "85vh",
    background: "#fff",
    display: "flex",

  },
  box: {
    width: 800,
    height: "80%",
    background: "#fff",
    borderRadius: 10,
    padding: 15,
    marginLeft: "20%",
    marginTop: "2%"
  },
}));

export default function DoctorInterface() {
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
  const [photograph, setPhotograph] = useState({ url: "", bytes: "" });
  const [formError, setFormError] = useState({})
  const handleError = (error, label) => {
    setFormError((prev) => ({ ...prev, [label]: error }))
  }
  const handleReset = () => {
    setCategoryId('')
    setDoctorName('')
    setAddress('')
    setCityId('')
    setEmailId('')
    setDOB('1/1/1')
    setGender('')
    setMobileno('')
    setQualification('')
    setStateId('')
    setPhotograph({ url: '', bytes: '' })
  }

  const isError = () => {
    var error = false
    if (categoryId.length === 0) {
      handleError('Select Category', 'categoryid')
      error = true
    }
    if (doctorName.length === 0) {
      handleError('Doctor Name Should Not Be Blank', 'doctorname')
      error = true
    }
    if (dob.length === 0) {
      handleError('Enter Date OF Birth', 'dob')
      error = true
    }
    if (gender.length === 0) {
      handleError('Select Gender', 'gender')
      error = true
    }
    if (address.length === 0) {
      handleError('Address Should Not Be Blank', 'address')
      error = true
    }
    if (stateid.length === 0) {
      handleError('Select State', 'stateid')
      error = true
    }
    if (cityid.length === 0) {
      handleError('Select City', 'cityid')
      error = true
    }
    if (qualification.length === 0) {
      handleError('Pls Enter Qualification', 'qualification')
      error = true
    }
    if (emailId.length === 0 || !(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(emailId)) {
      handleError('Pls Enter Correct Email Id', 'emailid')
      error = true
    }
    if (mobileno.length === 0 || !(/^[0-9]{10}$/).test(mobileno)) {
      handleError('Pls Enter Correct Mobile No.', 'mobileno')
      error = true
    }
    if (photograph.bytes.length === 0) {
      handleError('Pls Upload Picture', 'photograph')
      error = true
    }
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
    if (isError() === false) {
      var formData = new FormData();
      formData.append("category", categoryId);
      formData.append("doctorname", doctorName);
      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("address", address);
      formData.append("states", stateid);
      formData.append("city", cityid);
      formData.append("qualification", qualification);
      formData.append("emailid", emailId);
      formData.append("mobileno", mobileno);
      formData.append("photograph", photograph.bytes);
      formData.append("password", `${doctorName}##`);

      var result = await postData("doctorsubmit", formData);
      if (result.status) {
        Swal.fire({
          icon: 'success',
          title: result.message,
          showConfirmButton: false,
          timer: 5000
        })
      }
      else {
        (Swal.fire({
          icon: 'error',
          title: result.message,
          showConfirmButton: false,
          timer: 5000
        }))
      }
    }
  };

  var classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Heading
              color="#079992"
              icon={doctorimage}
              text="Doctor Register"
              linkimage={alldoctorimage}
              link={"/admindashboard/displayall"}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={categoryId}
                error={formError.categoryid}
                onFocus={() => handleError('', 'categoryid')}
                onChange={(event) => setCategoryId(event.target.value)}
              >
                <MenuItem>-Select Category-</MenuItem>
                {fillCategory()}
              </Select>

              {formError.categoryid ? <FormHelperText style={{ color: 'red' }}>{formError.categoryid}</FormHelperText> : <></>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formError.doctorname}
              onFocus={() => handleError('', 'doctorname')}
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
                  onFocus={() => handleError('', 'gender')}
                  value='Female'
                  control={<Radio />}
                  label="Female"
                  onChange={(event) => setGender(event.target.value)}
                />
                <FormControlLabel
                  error={formError.gender}
                  onFocus={() => handleError('', 'gender')}
                  value='Male'
                  control={<Radio />}
                  label="Male"
                  onChange={(event) => setGender(event.target.value)}
                />
                <FormControlLabel
                  error={formError.gender}
                  onFocus={() => handleError("", "gender")}
                  value='Other'
                  control={<Radio />}
                  label="Other"
                  onChange={(event) => setGender(event.target.value)}
                />
              </RadioGroup>
              {formError.gender ? <FormHelperText style={{ color: 'red' }}>{formError.gender}</FormHelperText> : <></>}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formError.dob}
              onFocus={() => handleError("", "dob")}
              helperText={formError.dob}
              onChange={(event) => setDOB(event.target.value)}
              value={dob}
              type="date"
              placeholder="Date Of Birth"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={formError.address}
              onFocus={() => handleError('', "address")}
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
                onFocus={() => handleError('', 'stateid')}
                onChange={handleStateChange}
                label="State">
                <MenuItem>-Select State-</MenuItem>
                {fillStates()}
              </Select>
              {formError.stateid ? <FormHelperText style={{ color: 'red' }}>{formError.stateid}</FormHelperText> : <></>}
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                value={cityid}
                error={formError.cityid}
                onFocus={() => handleError('', 'cityid')}
                label="City"
                onChange={(event) => setCityId(event.target.value)}
              >
                <MenuItem>-Select City-</MenuItem>
                {fillCity()}
              </Select>
              {formError.cityid ? <FormHelperText style={{ color: 'red' }}>{formError.cityid}</FormHelperText> : <></>}
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={qualification}
              error={formError.qualification}
              onFocus={() => handleError('', "qualification")}
              helperText={formError.qualification}
              onChange={(event) => setQualification(event.target.value)}
              label="Qualification"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={emailId}
              error={formError.emailid}
              onFocus={() => handleError('', "emailid")}
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
              onFocus={() => handleError('', "mobileno")}
              helperText={formError.mobileno}
              onChange={(event) => setMobileno(event.target.value)}
              label="Mobile Number"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <Button fullWidth variant="contained" component="label">
              Upload Doctor Image
              <input

                error={formError.photograph}
                onFocus={() => handleError('', "photograph")}

                onChange={handlePhotograph}
                type="file"
                hidden
                accept="image/*"
                multiple
              />
            </Button>
            {formError.photograph ? <FormHelperText style={{ color: 'red' }}>{formError.photograph}</FormHelperText> : <></>}
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              alt="Doctor Image"
              src={photograph.url}
              variant="rounded"
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleSubmit} fullWidth variant="contained">
              Submit
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button onClick={() => handleReset()} fullWidth variant="contained">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
