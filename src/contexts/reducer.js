export const initialState = {
    user: null,
    call: null
}

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_CALL: "SET_CALL",
    RESET_STATE: "RESET_STATE"
}

const reducer = (state, action) => {
    console.log('🚀', action);
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case actionTypes.SET_CALL:
            return {
                ...state,
                call: action.call
            }
        case actionTypes.RESET_STATE:
            return {
                ...state,
                user: null,
                call: null
            }
        default:
            return state;
    }
}

export default reducer;