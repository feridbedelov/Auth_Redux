import React, { useState } from 'react'
import "./auth.css"
import { auth } from "../../store/Auth/actions"
import astro from "../../assets/img/astro.png"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Navbar from '../Layout/Navbar'
import Spinner from "../Loading/Loader"

import { Form, Formik } from "formik"
import FormControl from "../CustomInputs/FormControl"
import { validateAuthForm } from "../../validation/formValidation"

const Authenticate = (props) => {


    const [signUp, setSignUp] = useState(true)

    const onSubmitHandler = (fields) => {
        props.onAuth(fields.email, fields.password, signUp);
    }

    const onChangeAuth = (e) => {
        e.preventDefault()
        setSignUp(!signUp)
    }

    let redirectToHomePage = null;
    if (props.isAuth) redirectToHomePage = <Redirect to="/movies" />

    let form = (
        <Formik
            initialValues={{ email: "", password: "" }}
            validate={validateAuthForm}
            onSubmit={onSubmitHandler}
        >
            {(formik) => (
                <Form className='ui form' autoComplete="off">
                    <FormControl label="Email" control="input" name="email" type="text" placeholder="Enter your email" />
                    <FormControl label="Password" control="input" name="password" type="password" placeholder="Enter your pass" />
                    <button disabled={formik.isSubmitting} type="submit" className="ui black  button">Submit</button>
                </Form>
            )}
        </Formik>
    )
    if (props.loading) {
        form = <div className = 'spinner-center'><Spinner /></div>
    }


    let errorMessages = null;
    if (props.error !== null) {
        errorMessages = (<div className="ui negative message">
            <div className="">{props.error.message} </div>
        </div>)
    }


    return (
        <div>
            {redirectToHomePage}
            <Navbar />
            <div className="auth">
                <img className="hero-auth" src={astro} alt="auth-hero" />
                <div className="form-center">
                    <h3>{signUp ? "Sign Up" : "Sign In"}</h3>
                    {errorMessages}
                    {form}
                    <button className="ui button btnOwn" onClick={onChangeAuth}>{signUp ? "Change To SignIn" : "Change To SignUp"}</button>
                </div>
            </div>
        </div>

    )
}


const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Authenticate)
