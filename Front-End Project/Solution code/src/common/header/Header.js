import React, {Component} from "react";
import './Header.css';
import logo from '../../assets/logo.jpeg';
import Button from '@material-ui/core/Button';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register"
import Modal from 'react-bootstrap/Modal';

const cssStyles = {
    content: {
        top: '50%',
        bottom: 'auto',
        left: '50%',
        right: 'auto',
        rightMargin: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const login_button = {
    float: 'right',
}

const box_style = {
    backgroundColor:'purple',
    height:'70px',
    width:'100%'
}
class Header extends Component{
    constructor(props) {
        const getLoggedInUser = () => {
            if(sessionStorage.getItem('access-token')!=null){
                return true;
            } else {
                return false;
            }
        }
        super(props);
        this.state= {
            isUserLoggedIn: getLoggedInUser(),
            value:0,
            openPopUp:false,
            register:false,
        }
        this.openLoginModalHandler = this.openLoginModalHandler.bind(this);
        this.closeLoginModalHandler = this.closeLoginModalHandler.bind(this);
        this.tabComponentHandler = this.tabComponentHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
        this.loggedIn = this.loggedIn.bind(this);
    }
    closeLoginModalHandler(){
        this.setState({ openPopUp: false })
    }
    openLoginModalHandler(){
        this.setState({ openPopUp: true});
    };
    logoutHandler(){
        console.log(sessionStorage.getItem('access-token'));
        sessionStorage.removeItem('uuid');
        sessionStorage.removeItem('access-token');
        this.setState({ isUserLoggedIn: false});
        window.location.reload();
    }
    loggedIn(){
        this.setState({ isUserLoggedIn: true});
    }
    tabComponentHandler(event,value){
        this.setState({ value });
    }
    render() {
        let button;
        if(this.state.isUserLoggedIn){
            button = <Button variant="contained" color="secondary" style={login_button} onClick={this.logoutHandler}>Logout</Button>
        }else{
            button = <Button variant="contained" color="primary" style={login_button} onClick={this.openLoginModalHandler}>Login</Button>
        }
        return(
            <div>
                <div className="header">
                    <div >
                        <img src={logo} className='logoIcon' alt='logo'/>&nbsp;&nbsp; <span style={{color:"white",fontSize:"25px" ,textAlign:"inherit" }}>Doctor Finder</span>
                        {button}
                    </div>
                </div>
                <Modal ariaHideApp={false} title={'Authenticate'} show={this.state.openPopUp} contentLabel="Login" onHide={this.closeLoginModalHandler} >
                    <Modal.Header style={{backgroundColor:"purple"}}>
                        <Modal.Title><p style={{color:"white" ,textAlign:"center" }}>Authentication</p></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                <Tabs  value={this.state.value} onChange={this.tabComponentHandler}>
                    <Tab label="Login" style={{width:"50%"}}/>
                    <Tab label="Register"  style={{width:"50%"}}/>
                </Tabs>
                        {this.state.value===0 && <Login baseUrl={this.props.baseUrl} closeModal={this.closeLoginModalHandler} loggedIn={this.loggedIn}/>}

                        {this.state.value===1 && <Register baseUrl={this.props.baseUrl} closeModal={this.closeLoginModalHandler}/>}
                        </Modal.Body>
                </Modal>


            </div>

        );
    }
}

export default Header;