import React, { useState } from 'react'
import "./auth.css"
import {auth} from "../../store/Auth/actions"
import astro from "../../assets/img/astro.png"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Authenticate = (props) => {

    const [fields, setFields] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})

    const [signUp, setSignUp] = useState(true)

    const validate = () => {
        let errors = {};
        let valid = true;

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fields.email))) {
            errors.email = "Invalid Email"
            valid = false
        }
        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(fields.password))) {
            errors.password = "Has to be at least 8 chars long 1digit and 1upperCase"
            valid = false
        }
        if (!valid) {
            setErrors(errors)
        }

        return valid
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const valid = validate();
        if (valid) {
           props.onAuth(fields.email,fields.password,signUp);
        } else {
            console.log("not okay")
        }
    }

    const onChangeAuth = (e) => {
        e.preventDefault()
        setSignUp(!signUp)
    }

    let authRedirect  = null ;
    if(props.isAuth){
        authRedirect = <Redirect to = "/" />
    }



    console.log(fields)

    let form = (
        <form className="ui form">
            
            <div className="field">
                <label>Email Address</label>
                <input placeholder="Eamil Address" value={fields.email} type="text"
                    onChange={e => {
                        setFields({ ...fields, email: e.target.value })
                        errors.email && setErrors({ ...errors, email: "" })
                    }} />
                {errors.email && <div className="errorMsg">{errors.email}</div>}
            </div>
            <div className="field">
                <label>Password</label>
                <input placeholder="Password" value={fields.password} type="password"
                    onChange={e => {
                        setFields({ ...fields, password: e.target.value })
                        errors.password && setErrors({ ...errors, password: "" })
                    }} />
                {errors.password && <div className="errorMsg" >{errors.password}</div>}
            </div>
            <button type="submit" onClick={onSubmitHandler} className="ui black  button">Submit</button>

        </form>
    ) 
    if(props.loading){
        form = <p>Loading ...</p>
    }


    let errorMessages = null;
    if(props.error !== null){
        errorMessages =( <div class="ui negative message">
            <div class="header">{props.error.message} </div>
        </div>)
    }


    return (
        <div className="auth">
            {authRedirect}
            <img className="hero" src={astro} />
            <div className="form-center">
                <h3>{signUp ? "Sign Up" : "Sign In"}</h3>
                {errorMessages}
                {form}
                <button className="ui button btnOwn" onClick={onChangeAuth}>{signUp ? "Change To SignIn" : "Change To SignUp"}</button>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return{
        loading: state.auth.loading,
        error : state.auth.error,
        isAuth : state.auth.token !==null
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        onAuth: (email, password,isSignUp) =>dispatch(auth(email,password,isSignUp)) 
    }
} 


export default connect(mapStateToProps,mapDispatchToProps)(Authenticate)
