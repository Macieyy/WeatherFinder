import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';


const userName = "admin";
const userPassword = "admin";


const signUpSchema = Yup.object().shape({
    userName: Yup.string()
        .required("Required"),
    password: Yup.string()
        .required("Required")
});

const api = user =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (user.userName === userName && user.password === userPassword) {
                resolve();
            } else {
                reject(new Error());
            }
        }, 1000);

    });


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { toggleLogin } = this.props;
        return (
            <Formik
                initialValues={{ userName: "", password: "", general: "" }}
                onSubmit={async (values, { setErrors, setSubmitting }) => {
                    try {
                        await api(values);
                        toggleLogin();
                    }
                    catch (error) {
                        setErrors(error);
                        error.general = "Your username or password is incorrect. Please try again.";
                        setSubmitting(false);
                    }
                }}


                validationSchema={signUpSchema}
            >
                {
                    props => {
                        const { values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit
                        } = props;

                        return (
                            <div style={{ height: "90vh" }} className="d-flex justify-content-center overflow-hidden">
                                <div style={{ backgroundColor: "rgb(248,248,248)" }} className="col-xl-3 col-lg-4 col-md-5 col-11 rounded shadow align-self-center">
                                    <h3 className=" pt-3 mx-3 text-center">Sign in</h3>
                                    {errors.general && (<div className="input-feedback text-danger mt-3 text-center ">{errors.general}</div>)}
                                    <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit}>
                                        <div className="form-group m-3">
                                            <label htmlFor="userName">Username</label>
                                            <input value={values.userName} name="userName" type="text" className={`form-control shadow ${
                                                errors.userName && touched.userName && "error"
                                                }`} id="userName" placeholder="Enter your username" onChange={handleChange} onBlur={handleBlur} />
                                        </div>
                                        {errors.userName && touched.userName && (
                                            <div className="input-feedback text-danger">{errors.userName}</div>
                                        )}
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input value={values.password} name="password" type="password" className={`form-control shadow ${
                                                errors.password && touched.password && "error"
                                                }`} id="userPassword" placeholder="Enter your password" onChange={handleChange} onBlur={handleBlur} />
                                        </div>
                                        {errors.password && touched.password && (
                                            <div className="input-feedback text-danger">{errors.password}</div>
                                        )}
                                        <button type="submit" disabled={isSubmitting} className="btn btn-primary m-3">Submit</button>
                                        <span className="mx-3 pb-3">Don't have an account? <a href="/#"><br className="d-xl-none" />Register now!</a></span>
                                    </form>
                                </div>
                            </div>

                        );
                    }}

            </Formik>
        );
    }
}