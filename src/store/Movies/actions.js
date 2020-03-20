import { MOVIES_SUCCCESS, REQUEST_START, REQUEST_FAIL } from "./constants"
import Axios from "axios"

export const getMovies = (movies) => {
    return {
        type: MOVIES_SUCCCESS,
        movies
    }
} 

export const requestStart = () => {
    return {
        type:REQUEST_START
    }
}

export const requestFail = (error) => {
    return {
        type:REQUEST_FAIL,
        error
    }
}

export const fetchMovies = () => {
    return dispatch => {
        dispatch(requestStart())
        Axios.get("https://astroworld-9a89a.firebaseio.com/movies.json")
        .then(res => {

            const moviesArr = [];
            for (let key in res.data) {
                moviesArr.push({
                    ...res.data[key],
                    id:key
                })
            }

            dispatch(getMovies(moviesArr))
        })
        .catch(err => {
            console.log(err)
            dispatch(requestFail(err))
        })
    }
}
