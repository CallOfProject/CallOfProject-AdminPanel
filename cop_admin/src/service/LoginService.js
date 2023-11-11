import axios from "axios";
import {UserLoginResponseDTO} from "../dto/UserLoginResponseDTO";

const LOGIN_URL = `http://localhost:4141/api/auth/login`
const LoginService = async (userInput) => {

    try {
        const response = await axios.post(LOGIN_URL, userInput);
        const responseData = response.data

        return new UserLoginResponseDTO(userInput.username, responseData.access_token, responseData.refresh_token, responseData.success)
    }
    catch (error) {
        return {success: false}
    }
}

export default LoginService


