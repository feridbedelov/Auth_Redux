import React from 'react'
import { Link } from 'react-router-dom'
import "./MovieDetail.css"
import { connect } from 'react-redux';
import Navbar from '../../Layout/Navbar';
import { useQuery } from 'react-query'
import { fetchMovie, removeMovie } from "../../../utils/queryFuncs/movies"

function MovieDetail(props) {

    const { id  } = props.match.params
    const { data: movieData, status, isFetching } = useQuery(['movie', id], fetchMovie)


    const onMovieDelete = async (e) => {
        e.preventDefault();
        let confirm = window.confirm("Are you sure to delete this movie?")
        if (confirm) {
            await removeMovie(id)
            props.history.push("/movies")
        }
        else {
            console.log("okay")
        }

    }

    let details;

    if (status === "loading") details = <p>Loading...</p>
    if (status === "error") details = <p>Something went wrong</p>


    let links = null;

    if (movieData && props.isAuth && props.userId === movieData.userId) {
        links = (
            <div>
                <Link to={"/editMovie/" + movieData.id} className="ui green inverted button">
                    Edit
                </Link>
                <button onClick={onMovieDelete} className="ui red inverted button">
                    Delete
                </button>
            </div>
        )
    }


    if (status === "success") details = (<div className="ui container details">

        <div className="details-movie">
            <h1 >Title : {movieData.title} {isFetching && "Background Updating"} </h1>
            <p >Director : {movieData.director} </p>
            <p >Release Year : {movieData.year}</p>
            <p >For more :
        <a href={movieData.link} target="_blank" >Click Here</a>
            </p>
            {links}
        </div>

        <a rel="noopener noreferrer" target="_blank" className="ui medium circular image" href={movieData.link}>
            <img src={movieData.imageLink} alt={movieData.title} />
        </a>
    </div>)

    return (
        <div>
            <Navbar />
            {details}
        </div>)
}


const mapStateTProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
        userId: state.auth.userId
    }
}


export default connect(mapStateTProps)(MovieDetail)
