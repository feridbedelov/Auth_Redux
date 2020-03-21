import { REQUEST_START, REQUEST_FAIL, MOVIES_SUCCCESS, MOVIE_SUCCCESS, MOVIE_ADD, MOVIE_DELETE, MOVIE_EDIT } from "./constants"

const initialState = {
    movies: [],
    error: null,
    loading: false,
    movie: {}

}

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case REQUEST_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case MOVIES_SUCCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                movies: action.movies,
                movie: {}
            }
        case MOVIE_SUCCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                movie: action.movie
            }
        case MOVIE_ADD:
            return {
                ...state,
                error: null,
                loading: false,
                movies: [...state.movies, action.addedMovie]
            }
        case MOVIE_DELETE:
            let newMovies = state.movies.filter(movie => movie.id !== action.id)
            return {
                ...state,
                loading: false,
                error: null,
                movie: {},
                movies: newMovies
            }
        case MOVIE_EDIT:
            return {
                ...state,
                loading:false,
                error:null,
                movie :{},
                movies: state.movies.map(movie =>
                    { 
                        if(movie.id === action.movie.id){
                            return action.movie
                        }
                        return movie
                    })
            }

           
        default:
            return state
    }
}

export default movieReducer