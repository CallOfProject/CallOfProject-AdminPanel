import {AUTH_URL_PREFIX} from "../ConnectionUtil";
import {getUserInformationFromLocalStorage} from "../dto/UserDTO";
import axios from "axios";

export const giveAdminRole = async (username) => {
    try {
        const GIVE_ROLE_URL = `${AUTH_URL_PREFIX}/api/root/give/role/admin?username=${username}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.post(GIVE_ROLE_URL, {}, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        return response.data.object
    } catch (error) {
        return false
    }
}


export const removeAdminRole = async (username) => {
    try {
        const REMOVE_ROLE_URL = `${AUTH_URL_PREFIX}/api/root/remove/role/admin?username=${username}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.post(REMOVE_ROLE_URL, {}, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        console.log("AUTH: ", response.data.object)
        return response.data.object
    } catch (error) {
        return false
    }
}