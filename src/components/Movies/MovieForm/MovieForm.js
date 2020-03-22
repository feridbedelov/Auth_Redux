import React, { useState, useEffect } from 'react'
import "./MovieForm.css"
import { connect } from 'react-redux'
import { addMovie, fetchMovie, updateMovie } from '../../../store/Movies/actions'
import { Redirect } from "react-router-dom"
import {v4 as uuid} from "uuid"
import Navbar from '../../Layout/Navbar'

function MovieForm(props) {

    useEffect(() => {
        if (props.match.params.id) {
            props.loadingMovie(props.match.params.id);
        }
    }, [])




    const [state, setState] = useState({
        id: (props.match.params.id && props.movie) ? props.movie.id : null,
        title: (props.match.params.id && props.movie) ? props.movie.title : "",
        director: (props.match.params.id && props.movie) ? props.movie.director : "",
        year: (props.match.params.id && props.movie) ? props.movie.year : "",
        link: (props.match.params.id && props.movie) ? props.movie.link : "",
        imageLink: (props.match.params.id && props.movie) ? props.movie.imageLink : ""
    })

    const [errors, setErrors] = useState({})

    const validate = () => {
        let fieldErrors = {}
        let isValid = true;

        if (state.title === "") {
            fieldErrors.titleError = "Name field can not be empty";
            isValid = false;
        }
        if (state.director.length <= 3) {
            fieldErrors.directorError = "Director field must be at least 3 letters long";
            isValid = false;
        }
        if (!(/^(1[9][0-9]\d|20[0-1]\d|2020)$/.test(state.year)) || state.year === "") {
            fieldErrors.yearError = "Enter a valid year";
            isValid = false;
        }
        if (state.link === "") {
            fieldErrors.linkError = "Enter a valid url of book";
            isValid = false;
        }
        if (state.imageLink === "") {
            fieldErrors.imageLinkError = "Enter a valid url of photo of book";
            isValid = false;
        }

        if (!isValid) {
            setErrors(
                fieldErrors
            )
        }

        return isValid;

    }


    const [redirectOnDone, setRedirectOnDone] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault();
        let isValid = validate();

        if (isValid) {
            

            if (props.match.params.id) {
                const updatedMovie = {
                    title: state.title,
                    director: state.director,
                    year: state.year,
                    link: state.link,
                    imageLink: state.imageLink,
                    userId: props.userID
                }
                console.log("updated")
                props.updatingMovie(props.match.params.id, updatedMovie)
            } else {
                console.log("added")
                const newMovie = {
                    id: uuid(),
                    title: state.title,
                    director: state.director,
                    year: state.year,
                    link: state.link,
                    imageLink: state.imageLink,
                    userId: props.userID
                }
                props.addingMovie(newMovie)

            }

            setRedirectOnDone(true)


        } else {

            console.log("not okay")
        }
    }



    let form = (
        <div>
            <Navbar />
        
        <div className="ui container formMovie">


            <form onSubmit={submitHandler} className="ui form form-movie">
                <h1 className="heading">Add Post</h1>
                <div className="field ten wide">
                    <label>Title</label>
                    <input
                        value={state.title}
                        type="text" placeholder="Enter a valid title"
                        name="title"
                        onChange={e => {
                            setState({ ...state, title: e.target.value })
                            errors.titleError && setErrors({ ...errors, titleError: null })
                        }}
                    />
                    {errors.titleError && <span>{errors.titleError}</span>}

                </div>
                <div className="field ten wide">
                    <label>Director</label>
                    <input
                        type="text" placeholder="Enter an director name"
                        value={state.director}
                        name="director"
                        onChange={e => {
                            setState({ ...state, director: e.target.value })
                            errors.directorError && setErrors({ ...errors, directorError: null })
                        }}
                    />
                    {errors.directorError && <span>{errors.directorError}</span>}
                </div>

                <div className="field ten wide">
                    <label> Release Year</label>
                    <input
                        type="text" placeholder="Enter a valid year"
                        value={state.year}
                        name="year"
                        onChange={e => {
                            setState({ ...state, year: e.target.value })
                            errors.yearError && setErrors({ ...errors, yearError: null })
                        }}
                    />
                    {errors.yearError && <span>{errors.yearError}</span>}
                </div>
                <div className="field ten wide">
                    <label>Link</label>
                    <input
                        type="text" placeholder="Enter a link"
                        value={state.link}
                        onChange={e => {
                            setState({ ...state, link: e.target.value })
                            errors.linkError && setErrors({ ...errors, linkError: null })
                        }}
                        name="link"
                    />
                    {errors.linkError && <span>{errors.linkError}</span>}
                </div>
                <div className="field ten wide">
                    <label>ImageLink</label>
                    <input
                        type="text" placeholder="Enter a image Link"
                        name="imageLink" value={state.imageLink}
                        onChange={e => {
                            setState({ ...state, imageLink: e.target.value })
                            errors.imageLinkError && setErrors({ ...errors, imageLinkError: null })
                        }}
                    />
                    {errors.imageLinkError && <span>{errors.imageLinkError}</span>}

                </div>
                <button type="submit" className="ui submit button">Submit</button>
            </form>



            {
                state.imageLink && (

                    <div>
                        <a rel="noopener noreferrer" target="_blank" className="ui large circular image" href={state.link}>
                            <img src={state.imageLink} alt="feradda" />
                        </a>
                    </div>)
            }
            </div>
        </div>
    )

    return redirectOnDone ? <Redirect to="/movies" /> : form
}



const mapStateToProps = state => {
    return {
        userID: state.auth.userId,
        movie: state.movie.movie
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        addingMovie: (movie) => dispatch(addMovie(movie)),
        loadingMovie: (id) => dispatch(fetchMovie(id)),
        updatingMovie : (id,movie) => dispatch(updateMovie(id,movie))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm)
