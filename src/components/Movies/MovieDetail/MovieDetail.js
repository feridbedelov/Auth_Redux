import React from 'react'
import { Link } from 'react-router-dom'
import "./MovieDetail.css"
import { connect } from 'react-redux';

function MovieDetail(props) {

    let links = null;

    if (props.isAuth) {
        links = (
            <div>
                <Link className="ui green inverted button">
                    Edit
                </Link>
                <Link className="ui red inverted button">
                    Delete
            </Link>
            </div>
        )
    }


    return (
        <div className="ui container details">

            <div className="details-movie">
                <h1 >Title : </h1>
                <p className="ui header">Director : </p>
                <p className="ui header">Release Year :</p>
                <p className="ui header">For more :
                    <a href="#" target="_blank" >Click Here</a>
                </p>

                {links}
            </div>

            <a rel="noopener noreferrer" target="_blank" className="ui medium circular image" href="">
                <img src="" alt="feradda" />
            </a>

        </div>
    )
}


const mapStateTProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    }
}


export default connect(mapStateTProps)(MovieDetail)
