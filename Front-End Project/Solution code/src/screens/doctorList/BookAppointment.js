import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {styled} from "@mui/styles";
import FormControl from "@material-ui/core/FormControl";
import {InputLabel} from "@mui/material";
import Select from '@mui/material/Select';
import {MenuItem} from "material-ui";
import {format} from "date-fns";

export default function BookAppointment(props) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        console.log(date);
        setSelectedDate(date);
        const formattedDate = format(date, "yyyy-MM-dd");
        let dataShows = null;
        fetch("http://localhost:8080/doctors/"+props.uuid+"/timeSlots?date="+formattedDate, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
        })
            .then(resp => resp.json())
            .then(resp => setTime(resp.timeSlot))
    };
    const [user, setUser] = React.useState("");
    const [error, setError] = React.useState("");
    const [time, setTime] = React.useState([]);
    const [selectedTime, setSelectedTime] = React.useState("");
    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const MyPaper = styled(Paper)({ textAlign:"left", margin:15, cursor:"pointer", padding: 20 });
    const HeaderPaper = styled(Paper)({textAlign:"left", margin:15, cursor:"pointer", padding: 20});


    function bookAppointment() {

        let userId=sessionStorage.getItem('uuid');
        fetch("http://localhost:8080/users/"+userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Authorization": "Bearer "+sessionStorage.getItem("access-token"),
            },
        })
            .then(resp => resp.json())
            .then(resp => setUser(resp))
console.log(user)

        fetch("http://localhost:8080/appointments/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Authorization": "Bearer "+sessionStorage.getItem("access-token"),
            },
            body: JSON.stringify({
                "doctorId": props.uuid, "doctorName": props.firstName+" "+props.lastName,"userId": userId ,
                "userName":user.firstName,"userEmailId":user.emailId,"timeSlot":selectedTime,
                "appointmentDate":selectedDate,"createdDate":null,"symptoms":symptoms,"priorMedicalHistory":Medhistory

            })

        }).then((response) => {
            if(!response.ok)
                response.json().then(text => { setError(text.message)})
            else setError("")
        })
    }
    const[symptoms,setSymptoms]=useState("");
    const[Medhistory,setMHistory]=useState("");
    const medSymptoms = (e) => {
        setSymptoms(e.target.value);
    };
    const medicalHistory = (e) => {
        setMHistory(e.target.value)
    }

    return (
        <div>
            <HeaderPaper style={{backgroundColor:"Purple",color:"white"}}>
                Book an Appointment
            </HeaderPaper>
            <MyPaper>
            <TextField disabled id="standard-disabled" label="Doctor Name" defaultValue={props.firstName+" "+props.lastName} variant="standard" /><br /><br />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    label="Date picker inline"
                    value={"2021-05-26"}
                    onChange={handleDateChange}
                />
            </MuiPickersUtilsProvider>
                <br /><br />
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Timeslot</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            label="Timeslot"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {time.map(times => (
                            <MenuItem value={times}>{times}</MenuItem>
                                ))}
                        </Select>
                    </FormControl>
<br /><p>{error}</p>
                <FormControl>

                        <TextField
                            id="outlined-multiline-static"
                            label="Medical History"
                            multiline
                            rows={5}
                            onChange={medicalHistory}
                            value={Medhistory}
                        />

                <TextField
                    id="outlined-multiline-static"
                    label="Symptoms"
                    multiline
                    rows={5}
                    onChange={medSymptoms}
                    value={symptoms}
                />
            </FormControl>

                        <br /> <br />

            <Button size="small" variant="contained" color="primary" onClick={bookAppointment} >BOOK APPOINTMENT</Button>
            </MyPaper>
        </div>
    );

}







