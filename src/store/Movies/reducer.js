import { REQUEST_START, REQUEST_FAIL, MOVIES_SUCCCESS } from "./constants"

const initialState = {
    movies: [],
    error : null,
    loading : false,

}

const movieReducer = (state=initialState , action) => {
    switch(action.type){
        case REQUEST_START :
            return {
                ...state,
                error:null,
                loading:true
            }
        case REQUEST_FAIL :
            return {
                ...state,
                error:action.error,
                loading:false
            } 
        case MOVIES_SUCCCESS : 
            return {
                ...state,
                error:null,
                loading:false,
                movies:action.movies
            }
        default:
            return state
    }
}

export default movieReducer