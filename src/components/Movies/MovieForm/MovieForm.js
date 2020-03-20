import React, { useState } from 'react'
import "./MovieForm.css"
import { connect } from 'react-redux'

function MovieForm(props) {


    const [state,setState] =  useState({
        title: "",
        director : "",
        year : "",
        link: "",
        imageLink : ""
    })

    const [errors , setErrors] =useState({})

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
        if (!(/^(1[8-9]{2}\d|20[0-1]\d|2020)$/.test(state.year)) || state.year === "") {
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


    const submitHandler = (e) => {
        e.preventDefault();
        let isValid = validate();

        if (isValid) {
            const newMovie = {
                ...state,
                userId : props.userID
            }
            console.log(newMovie);
        }else{

            console.log("not okay")
        }
    }


    return (
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
    )
}



const mapStateToProps = state => {
    return {
        userID : state.auth.userId
    }
}

export default connect(mapStateToProps) (MovieForm)
