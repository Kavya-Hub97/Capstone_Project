import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Box, CardContent, Link, Select, Stack} from "@mui/material";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import RateAppointment from "./RateAppointment";
import Modal from 'react-bootstrap/Modal';
import {GridList, List, ListItem, MuiThemeProvider} from "material-ui";
import {GridListTile} from "@material-ui/core";
import {getMuiTheme} from "material-ui/styles";

export default function Appointment(props){

    useEffect(() => {
        let token=sessionStorage.getItem("access-token");
        let user=sessionStorage.getItem('uuid');
        console.log(sessionStorage.getItem("access-token"));
        let dataShows = null;
        fetch("http://localhost:8080/users/"+user+"/appointments", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Authorization": "Bearer "+token,
            },
            body: dataShows,
        })
            .then(resp => resp.json())
            .then(resp => setAppointmentsList(resp))
    }, [])

    const useStyles = makeStyles((theme) => ({
        mainClass: {
            flexWrap: "wrap",
            display: "flex",
            "& > *": {
                height: theme.spacing(15),
                margin: theme.spacing(5),
                width: theme.spacing(50),
            },
        },
        gridList:{
            flexGrow: 1,
            cursor: 'pointer',
            width:'50%',
            align:"center",
            listStyleType:"none",
            margin:"15px", padding:"20px",
        },


    }));

    const isUserLoggedIn= () => {
        if(sessionStorage.getItem('access-token')!=null){
            return true;
        } else {
            return false;
        }
    }

    const classes = useStyles();
    const [popUpRatingApp, openPopUpRatingApp] = useState(false);
    const [appointmentsList, setAppointmentsList] = useState([]);
    const [uuid, setUUID] = useState("");
    const [appId, setAppId] = useState("");

    const openRating=(doctoruuid,appId)=>{
        setUUID(doctoruuid);
        setAppId(appId);
        openPopUpRatingApp(true)
    }

    function  closeRating() {
        openPopUpRatingApp(false )
    }

    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
                {isUserLoggedIn() === false &&
                  <p style={{textAlign:"center"}}>Login to See Appointments</p>
                }
                {isUserLoggedIn() === true &&
                <GridList cols={1} className={classes.gridList}>
                    {appointmentsList.map(appointment => (
                        <GridListTile>
                            <Paper variant="outlined">
                                <Box p={1} >
                                    <Typography>Doctor Name :{appointment.doctorName} </Typography>
                                        <Typography> Date : {appointment.appointmentDate}</Typography>
                                            <Typography>Symptoms: {appointment.symptoms} </Typography>
                                                <Typography>priorMedicalHistory: {appointment.priorMedicalHistory} </Typography>
                                    <Button size="small" variant="contained" onClick={() => openRating(appointment.doctorId,appointment.appointmentId)}  color="primary" >RATE APPOINTMENT</Button>
                                </Box>
                            </Paper>
                        </GridListTile>
                ))}
                </GridList>}
            <Modal ariaHideApp={false} show={popUpRatingApp} contentLabel="RATE APPOINTMENT" onHide={() => openPopUpRatingApp(false)}>
                <RateAppointment uuid={uuid} appId={appId} closeRating={closeRating} baseUrl={props.baseUrl}/>
            </Modal>
        </div>
        </MuiThemeProvider>
            );
}
