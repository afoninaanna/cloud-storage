import axios from "axios";
import { setUser } from "../reducers/userReducer";

export const registration = async (email, password) => {
    try {
        const responce = await axios.post('http://localhost:5000/api/auth/registration', {
            email,
            password
        });
        alert(responce.data.message);
    } catch (error) {
        console.log(error);
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const responce = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            dispatch(setUser(responce.data.user));
            localStorage.setItem("token", responce.data.token);
        } catch (error) {
            console.log(error);
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const responce = await axios.get('http://localhost:5000/api/auth/auth', 
                {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
            );
            dispatch(setUser(responce.data.user));
            localStorage.setItem("token", responce.data.token);
        } catch (error) {
            console.log(error);
            localStorage.removeItem('token');
        }
    }
}