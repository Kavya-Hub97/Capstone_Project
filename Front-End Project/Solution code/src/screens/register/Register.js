import React, {Component} from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Button from "@material-ui/core/Button";

//
// const cssStyles = {
//     content: {
//         top: '50%',
//         bottom: 'auto',
//         left: '50%',
//         right: 'auto',
//         rightMargin: '-50%',
//         transform: 'translate(-50%, -50%)'
//     }
// }
class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            usernameReg: "",
            passwordReg: "",
            register:false,
            firstnameReg:"",
            lastnameReg:"",
            emailReg:"",
            contactReg:"",
            successRegistration:false,
            firstnameRegCss: false,
            lastnameRegCss: false,
            emailRegCss: false,
            passwordRegCss: false,
            contactRegCss: false,

        }
        this.registerFirstnameHandler = this.registerFirstnameHandler.bind(this);
        this.registerLastnameHandler = this.registerLastnameHandler.bind(this);
        this.registerEmailHandler = this.registerEmailHandler.bind(this);
        this.registerEmailPasswordHandler = this.registerEmailPasswordHandler.bind(this);
        this.registerContactNoHandler = this.registerContactNoHandler.bind(this);
        this.registerTabHandler = this.registerTabHandler.bind(this);
    }

    registerFirstnameHandler(e){
        this.setState({ firstnameReg: e.target.value })
        this.setState({ firstnameRegCss: false })
    }
    registerLastnameHandler(e){
        this.setState({ lastnameReg: e.target.value })
        this.setState({ lastnameRegCss: false })
    }
    registerEmailHandler(e){
        this.setState({ emailReg: e.target.value })
        this.setState({ emailRegCss: false })

    }
    registerEmailPasswordHandler(e){
        this.setState({ passwordReg: e.target.value })
        this.setState({ passwordRegCss: false })
    }
    registerContactNoHandler(e){
        this.setState({ contactReg: e.target.value })
        this.setState({ contactRegCss: false })
    }
    registerTabHandler(){
        if(this.state.firstnameReg === ""){
            this.setState({ firstnameRegCss: true })
        }else{
            this.setState({ firstnameRegCss: false });
        }
        if(this.state.lastnameReg === "" ){
            this.setState({ lastnameRegCss: true })
        }else{
            this.setState({ lastnameRegCss: false });
        }
        if(this.state.emailReg === "" ){
            this.setState({ emailRegCss: true })
        }else{
            this.setState({ emailRegCss: false });
        }

        if( this.state.passwordReg === ""){
            this.setState({ passwordRegCss: true })
        }else{
            this.setState({ passwordRegCss: false });
        }
        if(this.state.contactReg === ""){
            this.setState({ contactRegCss: true })
        }else{
            this.setState({ contactRegCss: false })
        }
        if( this.state.firstnameReg === "" || this.state.lastnameReg === "" || this.state.emailReg === "" || this.state.passwordReg === "" || this.state.contactReg === ""){
            alert("Please fill all Required Fields");
            return false;
        }
        let that = this;
        let xhttp;
        let signUpPage = JSON.stringify({
            "firstName": this.state.firstnameReg, "lastName": this.state.lastnameReg, "emailId": this.state.emailReg,"password": this.state.passwordReg,
            "mobile": this.state.contactReg
        })
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
               that.setState({ successRegistration: true })
            }
        }
        xhttp.open("POST", this.props.baseUrl + "users/register");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Cache-Control", "no-cache");
        xhttp.send(signUpPage);

    }


    render() {
        return(
            <div>
                <div align="center">
                <FormControl error={this.state.firstnameRegCss} registerfirstname>
                    <InputLabel placeholder="first Name">First Name *</InputLabel>
                    <Input type="firstname" id="firstname" onChange={this.registerFirstnameHandler}></Input>
                    <FormHelperText error={this.state.firstnameRegCss} hidden={!this.state.firstnameRegCss}><span className="red">please fill out this field</span></FormHelperText>
                </FormControl><br/><br/>

                <FormControl error={this.state.lastnameRegCss} registerlastname>
                    <InputLabel placeholder="last Name">Last Name *</InputLabel>
                    <Input type="lastname" id="lastname" onChange={this.registerLastnameHandler}></Input>
                    <FormHelperText error={this.state.lastnameRegCss} hidden={!this.state.lastnameRegCss}><span className="red">required</span></FormHelperText>
                </FormControl><br/><br/>

                <FormControl error={this.state.emailRegCss} registeremailid>
                    <InputLabel placeholder="email">Email Id*</InputLabel>
                    <Input type="email" id="email" onChange={this.registerEmailHandler}></Input>
                    <FormHelperText error={this.state.emailRegCss} hidden={!this.state.emailRegCss }></FormHelperText>

                </FormControl><br/><br/>

                <FormControl error={this.state.passwordRegCss} registeremailpassword>
                    <InputLabel placeholder="passwordReg">Password *</InputLabel>
                    <Input type="password" id="passwordReg" onChange={this.registerEmailPasswordHandler}></Input>
                    <FormHelperText error={this.state.passwordRegCss} hidden={!this.state.passwordRegCss}><span className="red">required</span></FormHelperText>
                </FormControl><br/><br/>

                <FormControl error={this.state.contactRegCss} registercontactno>
                    <InputLabel placeholder="contact No">Mobile No *</InputLabel>
                    <Input type="tel" id="contactno" onChange={this.registerContactNoHandler} pattern="[789][0-9]{9}"></Input>
                    {<FormHelperText error={this.state.contactRegCss} hidden={!this.state.contactRegCss}><span className="red"></span>required</FormHelperText>}
                </FormControl><br/><br/>
                    {this.state.successRegistration === true &&
                        <FormControl successpop>
                            <span className="successMessage">Registration Successful. Please Login!</span>
                        </FormControl>}<br/><br/>
                <Button variant="contained" color="primary" onClick={this.registerTabHandler} >REGISTER</Button>
            </div>
            </div>
        );
    }
}

export default Register;