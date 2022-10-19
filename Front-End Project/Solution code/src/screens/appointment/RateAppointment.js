import React, {useState} from "react";
import {Card} from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Rating} from "@mui/material";
import FormHelperText from '@mui/material/FormHelperText';
export default function RateAppointment(props) {
    const [rating, setRating] = useState(0)

    const handleRating = (e) => {
        setRating(e.target.value)
        setRating( false)
    }
    function registerAppointment(){
        if (commentCss === "") {
           setCommentCss(true);
        } else {
            setCommentCss( false);
        }
        if (ratingCss === "") {
            setRatingCss(true);
        } else {
            setRatingCss( false);
        }

        let that = this;
        let xhttp;
        let commit = JSON.stringify({
            "appointmentId": props.appId, "doctorId": props.uuid,"rating": rating ,"comments":comments
        })
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
                props.closeRating();
            }
        }
        let token=sessionStorage.getItem("access-token");
        xhttp.open("POST", props.baseUrl + "ratings");
        xhttp.setRequestHeader("Authorization", "Bearer "+token);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Cache-Control", "no-cache");
        xhttp.send(commit);

    }
   function submitComments(e) {
       setComments(e.target.value);
       setComments(false)
    }
    const[comments,setComments]=useState('')
    const[commentCss,setCommentCss]=useState('false');
    const[ratingCss,setRatingCss]=useState('false');


    return(
    <div>
        <Card>
            <Card.Header style={{background:"purple"}}>
                <Card.Title><p style={{height:"70px", padding:"11px", color:"white",width: "18rem"}}>Rate an Appointment</p>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    <TextField required  label="Comments"  multiline rows={4} defaultValue="" variant="standard"
                                              onChange={submitComments}
                    /><br /><br />
                    Rating:<Rating  onChange={handleRating} value={rating} required/>
                       <FormHelperText error={commentCss} hidden={!(commentCss)}><span >select a rating</span></FormHelperText><br /><br /><br />
                    <Button type="submit" size="small" variant="contained" color="primary" onClick={registerAppointment}>RATE APPOINTMENT</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
)
}