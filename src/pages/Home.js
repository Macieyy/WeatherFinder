import React from 'react';
import MainSection from '../components/main/index';
import ProfileSection from "../components/profile/index";
import UserBar from "../components/main/UserBar";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="d-xl-flex flex-xl-row justify-content-center mt-2 p-md-5">
            <UserBar />
            <MainSection />
            <ProfileSection />
            </div>
        )
    }
}