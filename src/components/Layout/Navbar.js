import React from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'


function Navbar(props) {
    return (
        <div className="ui secondary menu">
            <Link to="/" className="item">Home</Link>
            <Link to="/movies" className="item">Movies</Link>
            {props.isAuth && <Link to="/orders" className="item">Orders</Link>}
            <div className="right menu">
                {props.isAuth ? <Link to="/logout" className="item">Logout</Link> : <Link to="/auth" className="item">Authenticate</Link>}
            </div>
        </div>
    )
}

const mapStateTProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateTProps)(Navbar)
