
import React, {useEffect, useState} from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";



import {
    Box,
    CardContent,
    createTheme,
    ImageList,
    ImageListItem,
    Link,
    ListItemText,
    Select,
    Stack
} from "@mui/material";
import Button from "@material-ui/core/Button";
import BookAppointment from "./BookAppointment";
import Modal from 'react-bootstrap/Modal';
import DoctorDetails from "./DoctorDetails";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {GridList, List, ListItem, MuiThemeProvider} from "material-ui";
import {getMuiTheme} from "material-ui/styles";
import {GridListTile} from "@material-ui/core";
import {ThemeProvider} from "@mui/styles";
import Rating from '@mui/material/Rating';
import FormControl from "@material-ui/core/FormControl";
import {styles} from "@material-ui/pickers/views/Clock/Clock";


export default function DoctorList(props) {


    useEffect(() => {
        let dataShows = null;
        fetch("http://localhost:8080/doctors/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: dataShows,
        })
            .then(resp => resp.json())
            .then(resp => setDoctors(resp))
    }, [])

    useEffect(() => {
        let dataShows = null;
        fetch("http://localhost:8080/doctors/speciality", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: dataShows,
        })
            .then(resp => resp.json())
            .then(resp => setSpecialities(resp))
    }, [])

    function selectSpeciality(speciality){
        let dataShows = null;
        fetch("http://localhost:8080/doctors?speciality="+speciality, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: dataShows,
        })
            .then(resp => resp.json())
            .then(resp => setDoctors(resp))
    }

    const useStyles = makeStyles((theme) => ({
        mainClass: {
            flexWrap: "nowrap",
            display: "flex",
            "& > *": {
                height: theme.spacing(10),
                margin: theme.spacing(0),
                width: theme.spacing(400),
            },
        },

        gridList:{
            flexGrow: 1,
            cursor: 'pointer',
            width:'50%',
            align:"center",
            listStyleType:"none"
        },

    }));


    const iconsInit= [{
        id: 1,
        stateId: "star1",
        color: "black"
    },
        {
            id: 2,
            stateId: "star2",
            color: "black"
        },
        {
            id: 3,
            stateId: "star3",
            color: "black"
        },
        {
            id: 4,
            stateId: "star4",
            color: "black"
        },
        {
            id: 5,
            stateId: "star5",
            color: "black"
        }]

    const [icons, setValue] = useState(iconsInit);
    const [doctors, setDoctors] = useState([]);
    const [specialities, setSpecialities] = useState([]);

    const starHandler = (id) => {
        var iconList = [];
        for (let star of this.state.icons) {
            let rateColor = star;
            if (star.id <= id) {
                rateColor.color = "yellow";
            } else {
                rateColor.color = "black";
            }
            iconList.push(rateColor);
        }
         setValue(iconList);
    }
    const classes = useStyles();
    const [popUpBookApp, openPopUpBookApp] = useState(false);
    const [popUpDocDet, openPopUpDocDet] = useState(false);
    const [uuid, setUUID] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const theme = createTheme({
        palette: {
            primary: {
                main: '#008000',
                darker: '#053e85',
            },
            neutral: {
                main: '#008000',
            },
        },
    });


    const openBookApp=(doctoruuid,fname,lname)=>{
        setUUID(doctoruuid);
        setFirstName(fname);
        setLastName(lname);
        openPopUpBookApp(true)
    }

    const openDetails=(doctoruuid)=>{
        setUUID(doctoruuid);
        openPopUpDocDet(true)
    }
    const [selectedOption, setSelectedOption] = useState("");
    const [rating, setRating] = useState(0)
    const handleRating = (rate) => {
        setRating(rate)
    }


    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <br />
            <div align="center">Select Speciality <br />
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <select
                    onChange={e => selectSpeciality(e.target.value)}>
                    <option></option>
                    {specialities.map(speciality => (
                        <option value={speciality}>{speciality}</option>
                    ))}
                </select>
                </FormControl>
            </div>
            <div style={{margin:'2% 0 0 30%'}}>
            <GridList cols={1} className={classes.gridList}>
                {doctors.map(doctor => (

                <GridListTile>
                        <Paper variant="outlined" >
                            <Box p={2} >
                                <Typography>Doctor Name :{doctor.firstName+ " "+doctor.lastName}</Typography><br/>
                                <Typography>Speciality : {" "+doctor.speciality}</Typography>
                                <Typography>Rating:
                                    <Rating readOnly value={doctor.rating}/>
                                 </Typography>
                                <br />
                                <Button size="small" variant="contained" onClick={() => openBookApp(doctor.id,doctor.firstName,doctor.lastName)}  color="primary" >BOOK APPOINTMENT</Button>&nbsp;&nbsp;&nbsp;
                                <MuiThemeProvider muiTheme={theme}>
                                <Button size="small" variant="contained" onClick={() => openDetails(doctor.id)}>VIEW DETAILS</Button>
                                </MuiThemeProvider>
                            </Box>
                        </Paper>
                    <br/>
                </GridListTile>

                    ))}
            </GridList>


            <Modal ariaHideApp={false} show={popUpBookApp} contentLabel="Book Appointment" onHide={() => openPopUpBookApp(false)}>
                <BookAppointment uuid={uuid} firstName={firstName} lastName={lastName}/>
            </Modal>
            <Modal ariaHideApp={false} show={popUpDocDet} contentLabel="View Details" onHide={() => openPopUpDocDet(false)}>
                <DoctorDetails uuid={uuid}/>
            </Modal>

        </div>
        </MuiThemeProvider>

    );
}