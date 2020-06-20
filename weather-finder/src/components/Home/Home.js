import React from 'react';
import MainSection from "./main/index"
import ProfileSection from "./profile/index";
import UserBar from "./main/UserBar";
import { withAuth } from '@okta/okta-react';

export default withAuth(
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            authenticated: null
        };
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
    }

    async getCurrentUser() {
        this.props.auth.getUser().then(user => this.setState({ user }));
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated });
        }
      }
  
      componentDidUpdate() {
        
        this.checkAuthentication();
        
      }

    componentDidMount() {
        this.getCurrentUser();
    }

    
    render() {
        if (!this.state.user || this.state.authenticated === null) return null;
        return (
            <div className="d-xl-flex flex-xl-row justify-content-center mt-2 p-md-5">
            <UserBar user={this.state.user.name} logOut={this.props.auth.logout}/>
            <MainSection />
            <ProfileSection />
            </div>
        )
    }
}
);