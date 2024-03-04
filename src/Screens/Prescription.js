import makeStyles from "@mui/styles/makeStyles";
import {
  Button,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import Heading from "../Component/Heading";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";
import addImage from "../Assets/Prescription.png";
import { useLocation } from "react-router-dom";
import { postData } from "../Services/FetchDjangoServices";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "83vw",
    height: "87vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
  },
  box: {
    width: 800,
    height: "auto",
    borderRadius: 10,
    padding: 10,
    background: "#fff",
  },
}));

const Medicine = ({
  data,
  handleNew,
  isDelete,
  handleChange,
  handleRemove,
  index,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} style={{ marginBottom: 3 }}>
        <TextField
          value={data.medicine}
          onChange={(event) =>
            handleChange(event.target.value, index, "medicine")
          }
          label="Medicine"
          fullWidth
        ></TextField>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Dose</InputLabel>
          <Select
            onChange={(event) =>
              handleChange(event.target.value, index, "dose")
            }
            label="Dose"
            value={data.dose}
          >
            {" "}
            <MenuItem>-Select Dose-</MenuItem>
            <MenuItem value={"OD"}>OD</MenuItem>
            <MenuItem value={"BD"}>BD</MenuItem>
            <MenuItem value={"TD"}>TD</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <TextField
          value={data.duration}
          onChange={(event) =>
            handleChange(event.target.value, index, "duration")
          }
          label="Duration"
          fullWidth
        ></TextField>
      </Grid>
      <Grid item xs={1}>
        {isDelete ? (
          <RemoveCircleOutline onClick={handleRemove}></RemoveCircleOutline>
        ) : (
          <ControlPointIcon onClick={handleNew}></ControlPointIcon>
        )}
      </Grid>
    </Grid>
  );
};

export default function Prescription(props) {
  var classes = useStyles();
  var location = useLocation();
  var patientdata = JSON.parse(location.state.patient);
  console.log("XXXXXX", patientdata);
  var doctor = JSON.parse(localStorage.getItem("DOCTOR"));
  const [test, setTests] = useState(" ");
  const [diet, setDiet] = useState(" ");
  const [medicine, setMedicine] = useState("");
  const [duration, setDuration] = useState("");
  const [dose, setDose] = useState("");
  const [patientname, setPatientName] = useState(
    patientdata.patient.PatientName
  );
  const [doctorid, setDoctorID] = useState(doctor.doctorname);
  const [med, setMed] = useState([{ medicine: "", dose: "", duration: "" }]);

  const handleNew = () => {
    setMed((prev) => [...prev, { medicine: "", dose: "", duration: "" }]);
  };

  const handleRemove = (index) => {
    const data = [...med];
    data.splice(index, 1);
    setMed([...data]);
  };

  const handleChange = (value, index, key) => {
    const data = [...med];
    data[index][key] = value;
    setMed([...data]);
  };

  const showMed = () => {
    return med.map((item, index) => {
      return (
        <Medicine
          data={item}
          handleChange={handleChange}
          isDelete={!(index + 1 === med.length)}
          index={index}
          handleNew={handleNew}
          handleRemove={handleRemove}
        />
      );
    });
  };

  const handleSubmit = async () => {
    var body = {
      patient: patientdata.patient.EmailId,
      doctor: doctor.id,
      answer: patientdata.id,
      test: test,
      diet: diet,
      medicine: JSON.stringify(med),
      currentdate: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()} `,
      currenttime: `${new Date().getHours()}:${
        new Date().getMinutes() + 1
      }:${new Date().getSeconds()} `,
    };
    console.log(body);
    var result = await postData("prescriptionsubmit", body);
    if (result.status) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: result.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleReset = () => {
    setDiet("");
    setDoctorID("");
    setDose("");
    setDuration("");
    setMedicine("");
    setPatientName("");
    setTests("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Heading
              icon={addImage}
              text="Prescription Interface"
              color="#079992"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={patientname}
              onChange={(event) => setPatientName(event.target.value)}
              fullWidth
              label="Patient Name"
            ></TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={doctorid}
              onChange={(event) => setDoctorID(event.target.value)}
              fullWidth
              label="Doctor ID"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={test}
              onChange={(event) => setTests(event.target.value)}
              label="Tests"
              fullWidth
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={diet}
              onChange={(event) => setDiet(event.target.value)}
              label="Diet"
              fullWidth
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            {showMed()}
          </Grid>

          <Grid item xs={6}>
            <Button
              onClick={handleSubmit}
              fullWidth
              color="success"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => handleReset()}
              fullWidth
              color="error"
              variant="contained"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
