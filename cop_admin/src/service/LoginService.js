import axios from "axios";
import {UserLoginResponseDTO} from "../dto/UserLoginResponseDTO";
import {AUTH_URL_PREFIX} from "../ConnectionUtil";

const LOGIN_URL = `${AUTH_URL_PREFIX}/api/admin/login`
const LoginService = async (userInput) => {

    try {
        const response = await axios.post(LOGIN_URL, userInput);
        const responseData = response.data
        return new UserLoginResponseDTO(userInput.username, responseData.access_token, responseData.refresh_token,
            responseData.success, responseData.role, responseData.blocked, responseData.user_id)
    }
    catch (error) {
        return {success: false}
    }
}
export default LoginService



