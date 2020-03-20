import React, { useEffect } from 'react'
import "./Movies.css"
import Movie from './Movie/Movie'
import Axios from 'axios'
import { fetchMovies } from '../../store/Movies/actions'
import { connect } from 'react-redux'
function Movies(props) {

    useEffect(() => {
        props.loadMovies()
    }, [])

    // const onclicksumit = () => {

    //     const data = {
    //         title : "Clockwork Orange",
    //         year : 1971,
    //         director : "Stanley Kubrick"
    //     }

    //     Axios.post("https://astroworld-9a89a.firebaseio.com/movies.json" ,data)
    //     .then(res => console.log(res.data))
    //     .catch(err => console.log(err))
    // }
    
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
