import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { useHistory, Redirect } from "react-router-dom"
import { useMutation, queryCache, useQuery } from 'react-query'
import { Formik, Form } from "formik"
import Navbar from '../../Layout/Navbar'
import FormControl from '../../CustomInputs/FormControl'
import { validationSchema } from '../../../validation/formValidation'
import { fetchMovie } from "../../../utils/queryFuncs/movies"

function MovieForm({ userId, ...props }) {

    const { id } = props.match.params
    const { data: movieData } = useQuery(['movie', id], fetchMovie)


    const [state, setState] = useState({
        title: "",
        director: "",
        year: "",
        link: "",
        imageLink: ""
    })

    useEffect(() => {
        if (id) {
            setState({ ...movieData })
        } else {
            setState({
                title: "",
                director: "",
                year: "",
                link: "",
                imageLink: ""
            })
        }
    }, [movieData, id])



    const history = useHistory()

    const [mutate] = useMutation(async (values) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        await Axios.put(`http://localhost:3000/movies/${values.id}`, values, config)
        history.push(`/movies/${values.id}`)
        
    }, {
        onMutate: (values) => {
            const prevMovie = queryCache.getQueryData(["movie", values.id])
            queryCache.setQueryData(["movie", values.id], values)
            return () => queryCache.setQueryData(["movie", values.id], prevMovie)
        },
        onError: (error, updatedMovie, rollback) => {
            rollback()
        }
    })

    let form = (
        <div>
            {(movieData && movieData.userId !== userId) && <Redirect to={`/movies/${movieData.id}`} />}
            <Navbar />
            <div className="ui container formMovie">
                <Formik
                    initialValues={state}
                    validationSchema={validationSchema}
                    onSubmit={mutate}
                    enableReinitialize
                >
                    {(formik) => (
                        <>
                            <Form className="ui form form-movie">
                                <h1 className="heading">Add Post</h1>

                                <FormControl control="input" name="title" label="Title" />
                                <FormControl control="input" name="director" label="Director" />
                                <FormControl control="input" name="year" label="Year" />
                                <FormControl control="input" name="link" label="Movie Link" />
                                <FormControl control="input" name="imageLink" label="Image Link " />

                                <button type="submit" className="ui submit button">Submit</button>
                            </Form>
                            {
                                formik.values.imageLink && (

                                    <div>
                                        <a rel="noopener noreferrer" target="_blank" className="ui large circular image" href={formik.values.imageLink} >
                                            <img src={formik.values.imageLink} alt={formik.values.title} />
                                        </a>
                                    </div>)
                            }
                        </>
                    )
                    }
                </Formik>
            </div>
        </div>
    )

    return form
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(MovieForm)




















// import React, { useState, useEffect } from 'react'
// import { connect } from 'react-redux'
// import Navbar from '../../Layout/Navbar'
// import { useQuery } from 'react-query'
// import { fetchMovie } from "../../../utils/queryFuncs/movies"



// function MovieForm(props) {


//     const { id } = props.match.params
//     const { data: movieData, status } = useQuery(['movie', id], fetchMovie)


//     const [state, setState] = useState({
//         id: null,
//         title: "",
//         director: "",
//         year: "",
//         link: "",
//         imageLink: ""
//     })

//     useEffect(() => {
//         if (id) {
//             setState({ ...movieData })
//         } else {
//             setState({
//                 id: null,
//                 title: "",
//                 director: "",
//                 year: "",
//                 link: "",
//                 imageLink: ""
//             })
//         }
//     }, [movieData])



//     const [errors, setErrors] = useState({})

//     const validate = () => {
//         let fieldErrors = {}
//         let isValid = true;

//         if (state.title === "") {
//             fieldErrors.titleError = "Name field can not be empty";
//             isValid = false;
//         }
//         if (state.director.length <= 3) {
//             fieldErrors.directorError = "Director field must be at least 3 letters long";
//             isValid = false;
//         }
//         if (!(/^(1[9][0-9]\d|20[0-1]\d|2020)$/.test(state.year)) || state.year === "") {
//             fieldErrors.yearError = "Enter a valid year";
//             isValid = false;
//         }
//         if (state.link === "") {
//             fieldErrors.linkError = "Enter a valid url of book";
//             isValid = false;
//         }
//         if (state.imageLink === "") {
//             fieldErrors.imageLinkError = "Enter a valid url of photo of book";
//             isValid = false;
//         }

//         if (!isValid) {
//             setErrors(
//                 fieldErrors
//             )
//         }

//         return isValid;

//     }


//     const [redirectOnDone, setRedirectOnDone] = useState(false)

//     const submitHandler = (e) => {
//         e.preventDefault();
//         let isValid = validate();

//         if (isValid) {


//             if (props.match.params.id) {
//                 const updatedMovie = {
//                     title: state.title,
//                     director: state.director,
//                     year: state.year,
//                     link: state.link,
//                     imageLink: state.imageLink,
//                     userId: props.userID
//                 }
//                 console.log("updated")
//                 props.updatingMovie(props.match.params.id, updatedMovie)
//             } else {
//                 console.log("added")
//                 const newMovie = {
//                     id: uuid(),
//                     title: state.title,
//                     director: state.director,
//                     year: state.year,
//                     link: state.link,
//                     imageLink: state.imageLink,
//                     userId: props.userID
//                 }
//                 props.addingMovie(newMovie)

//             }

//             setRedirectOnDone(true)


//         } else {

//             console.log("not okay")
//         }
//     }



//     let form = (
//         <div>
//             <Navbar />

//             <div className="ui container formMovie">


//                 <form onSubmit={submitHandler} className="ui form form-movie">
//                     <h1 className="heading">Add Post</h1>
//                     <div className="field ten wide">
//                         <label>Title</label>
//                         <input
//                             value={state.title}
//                             type="text" placeholder="Enter a valid title"
//                             name="title"
//                             onChange={e => {
//                                 setState({ ...state, title: e.target.value })
//                                 errors.titleError && setErrors({ ...errors, titleError: null })
//                             }}
//                         />
//                         {errors.titleError && <span>{errors.titleError}</span>}

//                     </div>
//                     <div className="field ten wide">
//                         <label>Director</label>
//                         <input
//                             type="text" placeholder="Enter an director name"
//                             value={state.director}
//                             name="director"
//                             onChange={e => {
//                                 setState({ ...state, director: e.target.value })
//                                 errors.directorError && setErrors({ ...errors, directorError: null })
//                             }}
//                         />
//                         {errors.directorError && <span>{errors.directorError}</span>}
//                     </div>

//                     <div className="field ten wide">
//                         <label> Release Year</label>
//                         <input
//                             type="text" placeholder="Enter a valid year"
//                             value={state.year}
//                             name="year"
//                             onChange={e => {
//                                 setState({ ...state, year: e.target.value })
//                                 errors.yearError && setErrors({ ...errors, yearError: null })
//                             }}
//                         />
//                         {errors.yearError && <span>{errors.yearError}</span>}
//                     </div>
//                     <div className="field ten wide">
//                         <label>Link</label>
//                         <input
//                             type="text" placeholder="Enter a link"
//                             value={state.link}
//                             onChange={e => {
//                                 setState({ ...state, link: e.target.value })
//                                 errors.linkError && setErrors({ ...errors, linkError: null })
//                             }}
//                             name="link"
//                         />
//                         {errors.linkError && <span>{errors.linkError}</span>}
//                     </div>
//                     <div className="field ten wide">
//                         <label>ImageLink</label>
//                         <input
//                             type="text" placeholder="Enter a image Link"
//                             name="imageLink" value={state.imageLink}
//                             onChange={e => {
//                                 setState({ ...state, imageLink: e.target.value })
//                                 errors.imageLinkError && setErrors({ ...errors, imageLinkError: null })
//                             }}
//                         />
//                         {errors.imageLinkError && <span>{errors.imageLinkError}</span>}

//                     </div>
//                     <button type="submit" className="ui submit button">Submit</button>
//                 </form>



//                 {
//                     state.imageLink && (

//                         <div>
//                             <a rel="noopener noreferrer" target="_blank" className="ui large circular image" href={state.link}>
//                                 <img src={state.imageLink} alt="feradda" />
//                             </a>
//                         </div>)
//                 }
//             </div>
//         </div>
//     )

//     return redirectOnDone ? <Redirect to="/movies" /> : form
// }



// const mapStateToProps = state => {
//     return {
//         userID: state.auth.userId
//     }
// }



// const mapDispatchToProps = (dispatch) => {
//     return {
//         addingMovie: (movie) => dispatch(addMovie(movie)),
//         updatingMovie: (id, movie) => dispatch(updateMovie(id, movie))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(MovieForm)
