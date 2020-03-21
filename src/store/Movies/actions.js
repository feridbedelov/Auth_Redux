import { MOVIES_SUCCCESS, REQUEST_START, REQUEST_FAIL, MOVIE_SUCCCESS, MOVIE_ADD,MOVIE_DELETE, MOVIE_EDIT } from "./constants"
import Axios from "axios"

export const getMovies = (movies) => {
    return {
        type: MOVIES_SUCCCESS,
        movies
    }
}

export const requestStart = () => {
    return {
        type: REQUEST_START
    }
}

export const requestFail = (error) => {
    return {
        type: REQUEST_FAIL,
        error
    }
}

export const getMovie = (movie) => {
    return {
        type: MOVIE_SUCCCESS,
        movie
    }
}

export const postMovie = (movie) => {
    return {
        type: MOVIE_ADD,
        addedMovie: movie
    }
}

export const deleteMovie = (id) => {
    return {
        type:MOVIE_DELETE,
        id
    }
}

export const editMovie = (movie) => {
    return {
        type: MOVIE_EDIT,
        movie
    }
}






export const fetchMovie = (id) => {
    return dispatch => {
        dispatch(requestStart())
        Axios.get("http://localhost:3000/movies/" + id)
            .then(res => {
                dispatch(getMovie(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(requestFail(err))
            })
    }
}

export const removeMovie = (id) =>{
    return dispatch=>{
        dispatch(requestStart())
        Axios.delete("http://localhost:3000/movies/" + id)
            .then(res => {
                dispatch(deleteMovie(id))
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                dispatch(requestFail(err))
            })
    }
}




export const fetchMovies = () => {
    return dispatch => {
        dispatch(requestStart())
        Axios.get("http://localhost:3000/movies")
            .then(res => {
                dispatch(getMovies(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(requestFail(err))
            })
    }
}


export const addMovie = (movie) => {
    return dispatch => {
        dispatch(requestStart())
        Axios.post("http://localhost:3000/movies", movie)
            .then(res => {
                dispatch(postMovie(movie))
               
            })
            .catch(err => {
                console.log(err)
                dispatch(requestFail(err))
            })
    }
}

export const updateMovie = (id,movie) => {
    return dispatch => {
        dispatch(requestStart())
        Axios.put("http://localhost:3000/movies/" + id , movie)
            .then(res => {
                console.log(res.data)
                dispatch(editMovie(res.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(requestFail(err))
            })
    }
}