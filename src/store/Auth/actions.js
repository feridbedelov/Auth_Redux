import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from "./constants"
import Axios from "axios"

export const authStart = () => {
    return {
        type: AUTH_START
    }
}
export const authSuccess = (token,userId) => {
    return {
        type: AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}
export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("userId")
    return {
        type: AUTH_LOGOUT
    }
}






export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime * 1000)
    }
}

export const auth = (email, password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRsj7HtorwCladgTQfmvcANiKedMvO-bM";
        if(!isSignUp){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRsj7HtorwCladgTQfmvcANiKedMvO-bM"
        }
        
        Axios.post(url,authData)
            .then(res => {
                console.log(res.data);

                const expirationDate = new Date(new Date().getTime() + (res.data.expiresIn * 1000));
                localStorage.setItem("token",res.data.idToken)
                localStorage.setItem("expirationDate",expirationDate);
                localStorage.setItem("userId",res.data.localId);



                dispatch(authSuccess(res.data.idToken,res.data.localId))
                dispatch(checkAuthTimeout(res.data.expiresIn))

            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        if(!token) {
            dispatch(logout())
        } else{
            const expireDate = new Date(localStorage.getItem("expirationDate"))

            if(expireDate <= new Date()){
                dispatch(logout())
            } else {
                const userId = localStorage.getItem("userId");
                dispatch(authSuccess(token,userId))
                dispatch(checkAuthTimeout( (expireDate.getTime() - new Date().getTime() ) / 1000 ))
            }

        }
    }
}