import axios from "axios";

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