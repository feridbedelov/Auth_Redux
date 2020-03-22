import React from 'react'
import { Link } from 'react-router-dom'

function MyMovie({ movie }) {
    return (
        <div className="item">
            <div className="image"><img src={movie.imageLink} /></div>
            <div className="middle aligned content">
                <Link to={"/movies/" + movie.id} className="header">{movie.title}</Link>
                <div className="meta"><span className="cinema">{movie.year}</span></div>
                <div className="description">
                    Director: {movie.director}

                        </div>
                <div className="extra">
                    <Link to={"/movies/" + movie.id} className="ui primary right floated button">
                        View More
                                <i aria-hidden="true" className="right chevron icon"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MyMovie
