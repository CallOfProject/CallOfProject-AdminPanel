import axios from "axios";
import {getUserInformationFromLocalStorage} from "../dto/UserDTO";
import {URL_PREFIX} from "../ConnectionUtil";

export const findUsers = async (page) => {
    try {
        const LOGIN_URL = `${URL_PREFIX}/api/admin/find/all/page?p=${page}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL, {headers: {"Authorization": `Bearer ${token}`}});

        return response.data.object.users
    } catch (error) {
        console.log(error)
    }
}


export const updateUser = async (userUpdateDTO) => {
    try {
        const UPDATE_URL = `${URL_PREFIX}/api/admin/update/user`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.put(UPDATE_URL, userUpdateDTO, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.object.users
    } catch (error) {
        console.log(error)
    }
}


export const removeUser = async (username) => {
    try {
        const UPDATE_URL = `${URL_PREFIX}/api/admin/remove/user?uname=${username}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.delete(UPDATE_URL, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        console.log(response.data.object)
        return response.data.object
    } catch (error) {
        console.log(error)
    }
}
