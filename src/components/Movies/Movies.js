import React from 'react'
import "./Movies.css"
import { useQuery } from "react-query"
import Movie from './Movie/Movie'
import { fetchMovies } from "../../utils/queryFuncs/movies"
import Navbar from '../Layout/Navbar'
function Movies(props) {

    const { data: moviesData, status,isFetching } = useQuery('movies', fetchMovies)

    if (status === "loading") return <p>Loading...</p>
    if (status === "error") return <p>Something went wrong</p>

    let movies;

    if (status === "success") {
        movies = (<div className="movies-list">
            {moviesData.map(movie => {
                return <Movie key={movie.id} movie={movie} />
            })}
        </div>)
    }


    return (
        <div>
            <Navbar />
            <div className="my-3 ui container">
                <h3>Movies List {isFetching && <span>Backgroung Updating</span>}</h3>
                {movies}
            </div>
        </div>
    )
}


export default Movies;
