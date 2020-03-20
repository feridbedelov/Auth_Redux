import React from 'react'
import { Link } from 'react-router-dom'
import "./Movie.css"


function Movie(props) {
    return (
        <Link to={"/movie/" + props.movie.id}>
            <div className="ui card">
                <div className="image"><img src="https://source.unsplash.com/random/200x200" /></div>
                <div className="content">
                    <div className="header"> {props.movie.title}</div>
                    <div className="meta"><span className="date">Release year : {props.movie.year}</span></div>
                    <div className="description"> Director : {props.movie.director}</div>
                </div>
                <div className="extra content">
                    <Link className="ui right floated primary button" to={"/movie/" + props.movie.id}>
                        View More
                </Link>
                </div>
            </div>
        </Link>
    )
}

export default Movie
