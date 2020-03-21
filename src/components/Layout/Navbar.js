import React from 'react'
import { Link, NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'


function Navbar(props) {
    return (
        < div className="ui large menu" >
            <NavLink exact to="/" className="item">Home</NavLink>
            <NavLink to="/movies" className="item">Movies</NavLink>

            <div className="right menu">
               
                {
                    props.isAuth && (
                    <Dropdown item text='Utilities'>
                        <Dropdown.Menu>
                            <div> <Link to="/addMovie" className="item">Add Movie</Link> </div>
                            <div> <Link to="/orders" className="item">Orders</Link> </div>
                            
                        </Dropdown.Menu>
                    </Dropdown>)
                }
               


                {props.isAuth ? <NavLink to="/logout" className="ui item ">Logout</NavLink> : <NavLink to="/auth" className="item">Authenticate</NavLink>}

            </div>
        </div >
    )
}

const mapStateTProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateTProps)(Navbar)


