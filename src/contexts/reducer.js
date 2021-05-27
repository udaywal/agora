export const initialState = {
    token: null,
    user: null
}

export const actionTypes = {
    SET_TOKEN: "SET_TOKEN",
    SET_USER: "SET_USER",
    RESET_STATE: "RESET_STATE"
}

const reducer = (state, action) => {
    console.log('🚀', action);
    switch(action.type) {
        case actionTypes.SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case actionTypes.RESET_STATE:
            return {
                ...state,
                token: null,
                user: null
            }
        default:
            return state;
    }
}

export default reducer;