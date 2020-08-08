import React, { useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { logout } from '../../store/Auth/actions';
import { connect } from 'react-redux';


function Logout({onLogout}) {

    useEffect(() => {
        onLogout();
    }, [onLogout])

    return (
        <div>
            <Redirect to="/" />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout:() => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)
