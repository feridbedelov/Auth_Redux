import {combineReducers} from "redux"
import AuthReducer from "./Auth/reducer"
import movieReducer from "./Movies/reducer"

const rootReducer = combineReducers({
    auth : AuthReducer,
    movie : movieReducer
})

export default  rootReducer