import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT } from "./constants"

const initialState = {
    token : null,
    userId : null,
    error : null,
    loading:false
}


const reducer = (state = initialState , action ) => {
    switch(action.type){
        case AUTH_START:
            return {
                ...state,
                loading:true,
                error:null
            }
        case AUTH_SUCCESS: 
            return {
                ...state,
                loading:false,
                error:null,
                token:action.token,
                userId:action.userId
            }
        case AUTH_FAIL: 
            return {
                ...state,
                loading:false,
                error:action.error
            }
        case AUTH_LOGOUT: 
            return {
                ...state,
                token:null,
                userId:null
            }
        default:
            return state;
    }
}

export default reducer