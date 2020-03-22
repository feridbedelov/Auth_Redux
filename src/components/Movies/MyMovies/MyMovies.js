import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchMyMovies } from '../../../store/Movies/actions'
import { connect } from 'react-redux'
import MyMovie from './MyMovie/MyMovie'
import Navbar from '../../Layout/Navbar'

function MyMovies(props) {

    useEffect(()=>{
        props.onFetchMyMovies(props.userId)
    },[])

    let movies = <p>Loading...</p>
    if(props.movies) {
        movies = (props.movies.map(movie=> {
           return <MyMovie key = {movie.id} movie={movie} />
        }))
    }

    return (
        <div>
        <Navbar />
        <div className="ui container">
            <div className="ui divided items">
                {movies}
            </div>
        </div>
       </div>
    )
}


const mapStateToProps = (state)=> {
    return {
        userId : state.auth.userId,
        movies: state.movie.myMovies,
        loading:state.movie.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMyMovies : (userId) => dispatch(fetchMyMovies(userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyMovies)
