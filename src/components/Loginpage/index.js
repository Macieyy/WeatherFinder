import React from 'react';
import Login from './Login';
import Register from "./Register"



export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { toggleLogin } = this.props;
        return (
            <Login toggleLogin={toggleLogin}/>
        );
        
    }
}