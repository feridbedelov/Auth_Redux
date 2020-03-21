import React, { useEffect } from 'react'
import "./Movies.css"
import Movie from './Movie/Movie'
import { fetchMovies } from '../../store/Movies/actions'
import { connect } from 'react-redux'
function Movies(props) {

    useEffect(() => {
        props.loadMovies()
    }, [])
    
    let movies = <p>Loading...</p>
    if(!props.loading){
        movies = (<div className="movies-list">
           {props.movies && props.movies.map(movie => {
               return <Movie key={movie.id} movie={movie}   />
           }) }
        </div>)
    }


    return (
        <div className="my-3 ui container">
            <h1>Movies List</h1>
            {movies}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        movies: state.movie.movies,
        loading: state.movie.loading,
        error: state.movie.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadMovies: () => dispatch(fetchMovies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies)
