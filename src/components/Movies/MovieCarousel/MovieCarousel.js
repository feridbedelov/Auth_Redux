import React from 'react'
import { Link } from 'react-router-dom'

function MovieCarousel({ movie }) {
    return (
        
            <Link className="carousel-movie-link" key={movie.id} to={"/movies/" + movie.id}>
                <img src={movie.imageLink} />
                <div className="movie-hover-overlay-title">
                    <h3 className="carousel-movie-title">{movie.title}</h3>
                </div>
            </Link>
       
    )
}

export default MovieCarousel
