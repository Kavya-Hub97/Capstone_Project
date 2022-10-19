import React, {Component} from "react";
import Header from "../../common/header/Header";
import './Home.css';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment";
import {AppBar, Box, Card, Modal} from "@mui/material";

import {withStyles} from '@material-ui/styles';

const styles = theme => ({
    root: {
        maxWidth: "100%",
    }
})

class Home extends Component{
    constructor(props) {
        super(props);
        this.state={
            value:0,
            isUserLoggedIn:false
        }
this.handleTabs=this.handleTabs.bind(this);
    }
handleTabs(event,value){
    this.setState({ value });
}

    render() {
        const { value } = this.state;
        return(
            <div>
            <Header baseUrl={this.props.baseUrl}/>
            <div style={{ width: '100%' }}>
                <AppBar position="static" color="default">
                    <Tabs value={value} onChange={this.handleTabs} indicatorColor="primary" textColor="primary" variant ="fullWidth">
                        <Tab classes={this.props.classes} label="DOCTORS" />
                        <Tab classes={this.props.classes} label="APPOINTMENTS" />
                    </Tabs>
                </AppBar>
                {value === 0 && <DoctorList  baseUrl={this.props.baseUrl}/>}
                {value === 1 && <Appointment baseUrl={this.props.baseUrl} />}
            </div>
            </div>
        );
    }
}

export default withStyles(styles)(Home);