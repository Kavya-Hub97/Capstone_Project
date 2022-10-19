import React, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button, CardImg} from 'react-bootstrap';
import 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import {yellow} from "@mui/material/colors";
import {white} from "material-ui/styles/colors";
import Rating from "@mui/material/Rating";
import Typography from "@material-ui/core/Typography";


export default function DoctorDetails(props) {
    useEffect(() => {
        let dataShows = null;
        fetch("http://localhost:8080/doctors/"+props.uuid, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            body: dataShows,
        })
            .then(resp => resp.json())
            .then(resp => {setDoctorDetails(resp);
            setAddress(resp.address)})
    }, [])
    const [doctor, setDoctorDetails] = useState("");
    const [address, setAddress] = useState("");

    return (
        <div>

            <Card>
                <Card.Header style={{background:"purple"}}>
                    <Card.Title><p style={{height:"70px", padding:"11px", color:"white",width: "18rem"}}> Doctor Details</p>
                </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                            Dr:{" "+doctor.firstName+" "+doctor.lastName}<br />
                            Total Experience:{" "+doctor.totalYearsOfExp+" "}years <br />
                            Speciality:{" "+doctor.speciality}<br />
                            Date of Birth:{" "+doctor.dob}<br />
                            City:{" "+address.city}<br />
                            Email:{" "+doctor.emailId}<br />
                            Mobile:{" "+doctor.mobile}<br />
                            Rating:<Rating readOnly value={Number(doctor.rating)}/><br />
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

}

