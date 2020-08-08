import React from 'react'
import { connect } from 'react-redux'
import MyMovie from './MyMovie/MyMovie'
import Navbar from '../../Layout/Navbar'
import { fetchMyMovies } from '../../../utils/queryFuncs/movies'
import { useQuery } from 'react-query'

function MyMovies({ userId }) {

    const { data: moviesData, status, isFetching } = useQuery(['mymovies', userId], fetchMyMovies)

    let movies;

    if (status === "loading") movies = <p>Loading...</p>
    if (status === "error") movies = <p>Something went wrong</p>

    if (status === "success") {
        if (moviesData.length > 0) {
            movies = (moviesData.map(movie => {
                return <MyMovie key={movie.id} movie={movie} />
            }))
        } else {
            movies = <p>You have no movies added</p>
        }
    }

    return (
        <div>
            <Navbar />
            <div className="ui container">
                <div className="ui divided items">
                    <h2>My Movies {isFetching && "Background fetching"} </h2>
                    {movies}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
    }
}


export default connect(mapStateToProps)(MyMovies)
