import React from 'react'
import { Link, NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next';


function Navbar(props) {

    const { t } = useTranslation();


    return (
        < div className="ui large menu" >
            <NavLink exact to="/" className="item">Home</NavLink>
            <NavLink to="/movies" className="item">{t("navbar.movies")}</NavLink>

            <div className="right menu">
               
                {
                    props.isAuth && (
                    <Dropdown item text='Utilities'>
                        <Dropdown.Menu>
                            <div> <Link to="/addMovie" className="item">Add Movie</Link> </div>
                            <div> <Link to="/myMovies" className="item">My Movies</Link> </div>
                            
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


