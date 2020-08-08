import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import { useMutation, queryCache } from 'react-query'
import { Formik, Form } from "formik"
import Navbar from '../../Layout/Navbar'
import FormControl from '../../CustomInputs/FormControl'
import { validationSchema } from '../../../validation/formValidation'
import "./MovieForm.css"
import { v4 as uuid } from "uuid"

const initialValues = {
    id:uuid(),
    title: "",
    director: "",
    year: "",
    link: "",
    imageLink: ""
}

function MovieForm({ userId }) {

    const history = useHistory()

    const [mutate] = useMutation(async (values) => {
        console.log(values)
        const newMovie = { ...values, userId }
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        await Axios.post("http://localhost:3000/movies", newMovie, config)
        
        history.push("/movies")
    }, {
        onMutate: (newM) => {
            let movies = [] 
            const prevMovies = queryCache.getQueryData("movies")
            if(prevMovies) movies = [...prevMovies]
            queryCache.setQueryData("movies",[...movies,newM])
            return prevMovies
        },
        onError: (error, newMovie,prevMovies) => {
            queryCache.setQueryData('movies', prevMovies)
        },
    })

    let form = (
        <div>
            <Navbar />
            <div className="ui container formMovie">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={mutate}
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
