import makeStyles from "@mui/styles/makeStyles"
import { useEffect, useState } from "react"
import { imageURL, postData } from "../Services/FetchDjangoServices"
import { Grid, Avatar, Paper, IconButton } from "@mui/material"
import { useLocation } from "react-router-dom"
import Download from "@mui/icons-material/Download"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from "react-router-dom"
const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        height: '95vh',
        background: '#f2f2f2',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },

    box: {
        width: '50vw',
        height: "auto",
        background: '#fff',
        padding: 10
    }
}))

export default function PrescriptionDisplay() {
    var classes = useStyles()
    const displayMedicine = (data) => {
        if (data !== undefined) {
            return JSON.parse(data)?.map((item, index) => {
                return (
                    <tr>
                        <th>{index + 1}</th>
                        <th>{item.medicine}</th>
                        <th>{item.dose}</th>
                        <th>{item.duration}</th>
                    </tr>
                )
            })
        }
        else {
            return <></>
        }
    }

    var doctor = JSON.parse(localStorage.getItem("DOCTOR"))
    var location = useLocation()
    var navigate = useNavigate()
    var patientData = JSON.parse(location.state.patient)
    const [prescription, setPrescription] = useState([])

    const handlePrint = () => {
        var printContents = document.getElementById("printableArea").innerHTML
        var originalContents = document.body.innerHTML
        document.body.innerHTML = printContents
        window.print();
        document.body.innerHTML = originalContents;
    }

    const handleArrow = () => {
        navigate("/doctordashboard/patientdisplay")
    }

    const fetchPrescription = async () => {
        var result = await postData("prescriptionlist", { answerid: patientData.id })
        setPrescription(result[0])
    }

    useEffect(function () {
        fetchPrescription()
    }, [])
    return (
        <div className={classes.container}>
            <IconButton style={{ position: 'absolute', zIndex: 2, top: 60, right: 170 }} onClick={handlePrint}><Download></Download></IconButton>
            <IconButton style={{ position: 'absolute', zIndex: 2, top: 60, left: 170 }} onClick={handleArrow}><ArrowBackIcon></ArrowBackIcon></IconButton>
            <Paper className={classes.box} elevation={24} id="printableArea">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <div style={{ margin: 15, padding: 5, display: "flex", justifyContent: "left", width: 150, alignItems: "center", flexDirection: "column" }}>
                            <div> <Avatar alt="Remy Sharp" src={`${imageURL}${doctor?.photograph}`} sx={{ width: 80, height: 80 }} /></div>
                            <div style={{ color: '#154360', fontWeight: 'bold', fontSize: 18, fontFamily: "kanit", marginTop: "2%" }}>Dr. {doctor?.doctorname}</div>
                            <div style={{ color: '#154360', fontSize: 14, fontWeight: 400, fontFamily: "kanit", marginTop: "3%" }}>{doctor?.emailid}</div>
                            <div style={{ color: '#154360', fontSize: 14, fontWeight: 400, fontFamily: "kanit", marginTop: "4%" }}>+91{doctor?.mobileno}{" "}</div></div></Grid>
                    <Grid item xs={6}>
                        <div style={{ margin: 15, padding: 5, display: 'flex', alignItems: "flex-end", width: 330, flexDirection: "column" }}>
                            <div style={{ color: "Crimson", fontWeight: "bolder", fontSize: 20, fontFamily: 'kanit', marginTop: "2%" }}>Patient Details</div>
                            <div style={{ color: '#154360', fontWeight: "bold", fontSize: 18, fontFamily: 'kanit', marginTop: "2%" }}>{prescription?.patient?.PatientName}</div>
                            <div style={{ color: '#154360', fontWeight: 400, fontSize: 14, fontFamily: 'kanit', marginTop: "2%" }}>{prescription?.patient?.Age} Year, {prescription?.patient?.Gender}</div>
                            <div style={{ color: '#154360', fontWeight: 400, fontSize: 14, fontFamily: 'kanit', marginTop: "2%" }}>+91{prescription?.patient?.Mobileno}{" "}</div>
                        </div></Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', alignItems: "flex-end", margin: "0px 15px 15px 15px", flexDirection: "column" }}>
                            <div style={{ color: "crimson", fontFamily: "kanit", fontWeight: "bolder", fontSize: 20 }}>Tests</div>
                            <div style={{ fontFamily: "kanit", fontWeight: "bold", fontSize: 18, marginTop: "1%" }}> {prescription?.test}</div></div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', margin: "0px 15px 15px 15px", padding: 5, alignItems: "center", flexDirection: 'column' }}>
                            <div style={{ color: "crimson", fontFamily: "kanit", fontWeight: "bolder", fontSize: 20, alignSelf: "flex-start", marginLeft: "9%" }}>Medicine</div>
                            <table cellSpacing="0" cellPadding="5" border="1" width="600">
                                <tbody>
                                    <tr style={{ color: "#22a6b3" }}>
                                        <th>Sn</th>
                                        <th>Medicine</th>
                                        <th>Dose</th>
                                        <th>Days</th>
                                    </tr>
                                    {displayMedicine(prescription?.medicine)}
                                </tbody>
                            </table>
                        </div></Grid>
                    <Grid item xs={12}>
                        <div style={{ fontFamily: "kanit", fontWeight: "bold", fontSize: 20, display: 'flex', justifyContent: "center", marginTop: 15, width: "50%" }}>Note: Consult after 7 Days</div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}