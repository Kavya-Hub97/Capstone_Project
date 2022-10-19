import React, {Component, useEffect} from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Button from "@material-ui/core/Button";
import popover from "bootstrap/js/src/popover";

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            usernameCss:false,
            passwordCss:false,
            password:"",
            validEmail:false


        }
        this.usernameHandler = this.usernameHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.loginSelectHandler = this.loginSelectHandler.bind(this);
    }

    isEmailNotValid(val) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(val)) {
            return true;
        } else {
            return false;
        }
    }
        loginSelectHandler()
        {
            if (this.state.username === "") {
                this.setState({usernameCss: true});
            } else {
                this.setState({usernameCss: false});
            }
            if(this.isEmailNotValid(this.state.username)){
                this.state.validEmail=true;
                return ;
            }
            if (this.state.password === "") {
                this.setState({passwordCss: true});
            } else {
                this.setState({passwordCss: false});
            }

            if (this.state.username === "" || this.state.password === "") {
                alert("Please fill all Required Fields");
                return;
            }

            let that = this;
            let xhttp;
            let userLogin = JSON.stringify({
                "username": this.state.username, "password": this.state.password
            })
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    console.log(xhttp.getResponseHeader('accessToken'));
                    sessionStorage.setItem('uuid', JSON.parse(this.responseText).id);
                    sessionStorage.setItem('access-token', JSON.parse(this.responseText).accessToken);
                    that.props.closeModal();
                    that.props.loggedIn();
                }
            }
            xhttp.open("POST", this.props.baseUrl + "auth/login");
            xhttp.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.password));
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.setRequestHeader("Cache-Control", "no-cache");
            xhttp.send(userLogin);

        }
        usernameHandler(e)
        {
            this.setState({username: e.target.value})
            this.setState({usernameCss: false})
            this.setState({validEmail: false})

        }
        passwordHandler(e)
        {
            this.setState({password: e.target.value})
            this.setState({passwordCss: false})
        }

    render() {

        return(
            <div style={{ display:'flex-wrap' }} align="center">
                <FormControl error={this.state.usernameCss} loginusername>
                    <InputLabel placeholder="username" >Email *</InputLabel>
                    <Input type="text" id="username" username={this.state.username} onChange={this.usernameHandler} required/>
                    <FormHelperText error={this.state.usernameCss} hidden={!this.state.usernameCss}><span >required</span></FormHelperText>

                {(this.state.validEmail === true) && <FormHelperText error>Enter Valid Email</FormHelperText> }
                </FormControl>  <br/><br/>
                <FormControl error={this.state.passwordCss} loginpassword>
                    <InputLabel placeholder="password">Password *</InputLabel>
                    <Input type="password" id="password" password={this.state.password} onChange={this.passwordHandler} required/>
                    <FormHelperText error={this.state.passwordCss} hidden={!this.state.passwordCss}><span >required</span></FormHelperText>

                </FormControl><br/><br/>
                <Button variant="contained" color="primary" onClick={this.loginSelectHandler}>LOGIN</Button>
            </div>
        );
    }
}

export default Login;