
const defaultState = {
    currentUser: {},
    isAuth: false
};

const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        default:
           return state;
    }
}

export const setUser = user => ({type: SET_USER, payload: user});
export const logOut = () => ({type: LOGOUT});