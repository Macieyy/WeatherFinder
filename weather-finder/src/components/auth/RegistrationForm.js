import React from "react";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import config from "../../app.config";

const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string()
    .required("Required")
    .email("Looks like it's not an email name"),
  password: Yup.string()
    .required("Required")
    .min(
      10,
      "Must be at least 10 characters, at least one upper case letter and one number"
    )
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
      "Must be at least 10 characters, at least one upper case letter and one number"
    ),
});
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  generalError: "",
  emailError: "",
  firstNameError: "",
  lastNameError: "",
  passwordError: "",
}
export default withAuth(
  class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        initialState,
        sessionToken: null,
      };
      this.oktaAuth = new OktaAuth({ url: config.url });
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
     this.handleEmailChange = this.handleEmailChange.bind(this);
	  this.handlePasswordChange = this.handlePasswordChange.bind(this);
	   this.validate = this.validate.bind(this)
    }

    async checkAuthentication() {
      const sessionToken = await this.props.auth.getIdToken();
      if (sessionToken) {
        this.setState({ sessionToken });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    handleFirstNameChange = (e) => {
      this.setState({ firstName: e.target.value });
    }
    handleLastNameChange = (e) => {
      this.setState({ lastName: e.target.value });
    }
    handleEmailChange = (e) => {
      this.setState({ email: e.target.value });
    }
    handlePasswordChange = (e) => {
      this.setState({ password: e.target.value });
    }

	validate = () =>{
		let emailError = "";
		// let firstNameError ="";
		// let lastNameError = "";
		// let passwordError ="";
		if(!this.state.email.includes("@")){
			emailError = "Looks like it's not an email name"
		}
		if(emailError){
			this.SetState({emailError});
			return false;
		}

		return true;
	}
	

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state)
		// fetch("/api/users", {
		// 	method: "POST",
		// 	headers: {
		// 	  Accept: "application/json",
		// 	  "Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(this.state),
		//   })
		// 	.then(() => {
		// 	  this.oktaAuth
		// 		.signIn({
		// 		  username: this.state.email,
		// 		  password: this.state.password,
		// 		})
		// 		.then(
		// 		  (res) =>
		// 			this.setState({
		// 			  sessionToken: res.sessionToken,
		// 			}),
		// 		  (error) => {
		// 			if (error) {
		// 			  this.setState({
		// 				generalError: `{${error.statusCode} error ${error.name}}`,
		// 			  });
		// 			  console.log(" error", error.name);
		// 			}
		// 		  }
		// 		);
		// 	})
		// 	.catch((err) => {
		// 	  this.setState({
		// 		generalError: `{${err.statusCode} error ${err.name}}`,
		// 	  });
		// 	});
	  }
    }

    render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }
      const errorMessage = this.state.generalError ? (
        <div className="error-message input-feedback text-danger mt-3 text-center">
          {this.state.generalError}
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
            <h3 className=" pt-3 mx-3 text-center">Sign up</h3>
            {errorMessage}
            <form
              className="d-flex flex-column align-items-center"
              onSubmit={this.handleSubmit}
              noValidate
            >
              <div className="form-group m-2 form-element">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  className="form-control shadow"
                  placeholder="Enter your email"
                />
              </div>
              {this.state.emailError ? (
                <div className="input-feedback text-danger">
                  {this.state.emailError}
                </div>
              ) : null}

              <div className="form-group m-2 form-element">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  id="firstName"
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange}
                  className="form-control shadow"
                  placeholder="Enter your first name"
                />
              </div>
              {this.state.firstNameError ? (
                <div className="input-feedback text-danger">
                  {this.state.firstNameError}
                </div>
              ) : null}

              <div className="form-group m-2 form-element">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                  className="form-control shadow"
                  placeholder="Enter your username"
                />
              </div>
              {this.state.lastNameError ? (
                <div className="input-feedback text-danger">
                  {this.state.lastNameError}
                </div>
              ) : null}

              <div className="form-group m-2 form-element">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  className="form-control shadow"
                  placeholder="Enter your password"
                />
              </div>
              {this.state.passwordError ? (
                <div className="input-feedback text-danger">
                  {this.state.passwordError}
                </div>
              ) : null}

              <button type="submit" className="btn btn-primary m-3">
                Submit
              </button>
              <span className="mx-3 pb-3">
                Already have an account?{" "}
                <Link to="/login">
                  <br className="d-xl-none" />
                  Sign in!
                </Link>
              </span>
            </form>
          </div>
        </div>
      );
    }
  }
);
