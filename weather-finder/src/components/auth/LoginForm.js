import React from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
/**
 * Komponent z formularzami oraz logiką procesu logowania.
 * @component
 */
class LoginForm extends React.Component {
  constructor(props) {
	super(props);
	/** Utworzenie stanów początkowych */
    this.state = {
      sessionToken: null,
      error: null,
      username: "",
      password: "",
    };

    this.oktaAuth = new OktaAuth({ url: props.baseUrl });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  /**
   * Metoda zatwierdzająca proces logowania. Jeśli wpisane dane są poprawne to użytkownik zostanie zalogowany. Jeśli nastąpi error użytkownik zostanie poinformowany odpowiednim komunikatem.
   */
  handleSubmit(e) {
    e.preventDefault();
    this.oktaAuth
      .signIn({
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) =>
        this.setState({
          sessionToken: res.sessionToken,
        })
      )
      .catch((err) => {
        this.setState({
          error: "Your username or password is incorrect. Please try again.",
        });
        console.log(err.statusCode + " error", err.name);
      });
  }
  /**
   * Metoda, która ustawia stan dla zmiennej username poprzez odpowiednie pole fomularza
   */
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  /**
   * Metoda, która ustawia stan dla zmiennej password poprzez odpowiednie pole fomularza
   */
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    console.log(this.props);
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }

    const errorMessage = this.state.error ? (
      <div className="error-message input-feedback text-danger mt-3 text-center">
        {this.state.error}
      </div>
    ) : null;

    return (
      <div
        style={{ height: "90vh" }}
        className="d-flex justify-content-center overflow-hidden"
      >
        <div
          style={{ backgroundColor: "rgb(248,248,248)" }}
          className="col-xl-3 col-lg-4 col-md-5 col-11 rounded shadow align-self-center"
        >
          <h3 className=" pt-3 mx-3 text-center">Sign in</h3>
          {errorMessage}
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={this.handleSubmit}
          >
            <div className="form-group m-2 form-element">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={this.state.username}
                onChange={this.handleUsernameChange}
                className="form-control shadow"
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group m-2 form-element">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                className="form-control shadow"
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="btn btn-primary m-3">
              Submit
            </button>
            <span className="mx-3 pb-3">
              Doesn't have an account?{" "}
              <Link to="/register">
                <br className="d-xl-none" />
                Sign up!
              </Link>
            </span>
          </form>
        </div>
      </div>
    );
  }
}
export default withAuth(LoginForm);
