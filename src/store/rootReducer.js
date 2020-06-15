import {combineReducers} from "redux"
import AuthReducer from "./Auth/reducer"
import movieReducer from "./Movies/reducer"
import langReducer from "./Language/langReducer"

const rootReducer = combineReducers({
    auth : AuthReducer,
    movie : movieReducer,
    lang: langReducer
})

export default  rootReducer