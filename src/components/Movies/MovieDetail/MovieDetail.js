import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import "./MovieDetail.css"
import { connect } from 'react-redux';
import { fetchMovie, removeMovie } from '../../../store/Movies/actions';
import Navbar from '../../Layout/Navbar';

function MovieDetail(props) {

    useEffect(()=> {
        props.loadingMovie(props.match.params.id)
    },[])


    const [redirectOnDelete,setRedirectOnDelete] = useState(false)

    const onMovieDelete = (e) => {
        e.preventDefault();
        let confirm  = window.confirm("Are you sure to delete this movie?")
        if(confirm){
            props.removingMovie(props.movie.id)
            setRedirectOnDelete(true);
        }
        else{
            console.log("okay")
        }
        
    } 




    let links = null;

    if (props.isAuth && props.userId === props.movie.userId  ) {
        links = (
            <div>
                <Link to={"/editMovie/" + props.movie.id } className="ui green inverted button">
                    Edit
                </Link>
                <button onClick= {onMovieDelete}  className="ui red inverted button">
                    Delete
                </button>
            </div>
        )
    }

    let details = <p>Loading... </p>
    if(props.movie){
        details =(
            <div>
                <Navbar />
            <div className="ui container details">

            <div className="details-movie">
                <h1 >Title : {props.movie.title} </h1>
                <p >Director : {props.movie.director} </p>
                <p >Release Year : {props.movie.year}</p>
                <p >For more :
                    <a href={props.movie.link} target="_blank" >Click Here</a>
                </p>

                {links}
            </div>

            <a rel="noopener noreferrer" target="_blank" className="ui medium circular image" href="">
                <img src={props.movie.imageLink} alt="feradda" />
            </a>
            </div>
        </div>)
    }

    return redirectOnDelete ?  <Redirect to = "/movies" /> :  details
}


const mapStateTProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
        movie: state.movie.movie,
        userId : state.auth.userId
    }
}


const mapDispatchToProps = dispatch => {
    return {
        loadingMovie : (id) => dispatch(fetchMovie(id)),
        removingMovie : (id) => dispatch(removeMovie(id))
    }
} 

export default connect(mapStateTProps,mapDispatchToProps)(MovieDetail)
