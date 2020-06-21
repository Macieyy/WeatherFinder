import React from "react";
import MainSection from "./main/index";
import ProfileSection from "./profile/index";
import UserBar from "./main/UserBar";
import { withAuth } from "@okta/okta-react";

/**
 * Strona główna, dostępna po zalogowaniu.
 * @component
 */
class Home extends React.Component {
  constructor(props) {
    super(props);
    /** Utworzenie stanów początkowych */
    this.state = {
      user: null,
      authenticated: null,
    };
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }
  /**
   * Metoda, która pobiera dane użytkownika
   */
  async getCurrentUser() {
    this.props.auth.getUser().then((user) => this.setState({ user }));
  }
  /**
   * Metoda autentykująca, sprawdza czy użytkownik się poprawnie zalogował.
   */
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
        <UserBar user={this.state.user.name} logOut={this.props.auth.logout} />
        <MainSection />
        <ProfileSection />
      </div>
    );
  }
}
export default withAuth(Home);
