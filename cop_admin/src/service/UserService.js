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
        console.log("H: ", response.data.object)
        return response.data.object
    } catch (error) {
        console.log("D: ", error)
    }
}


export const removeUser = async (username) => {
    try {
        const UPDATE_URL = `${URL_PREFIX}/api/admin/remove/user?uname=${username}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.delete(UPDATE_URL, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        return response.data.object
    } catch (error) {

        return false
    }
}


export const logout = async () => {
    try {
        const LOGOUT_URL = `${URL_PREFIX}/api/auth/logout`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.post(LOGOUT_URL, {}, {headers: {"Authorization": `Bearer ${token}`}});

        if (response.status === 200) {
            localStorage.clear()
            return true;
        }
        return false;
    } catch (error) {

        console.log(error)
        return false;
    }
}


export const findAllUserCount = async () => {
    try {
        const ALL_USER_COUNT_URL = `${URL_PREFIX}/api/admin/find/user/all/count`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(ALL_USER_COUNT_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const findNewUsersLastNday = async (day) => {
    try {
        const NEW_USER_COUNT_URL = `${URL_PREFIX}/api/admin/find/user/all/new?n=${day}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(NEW_USER_COUNT_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const findUsersWitKeyword = async (page, word) => {
    try {
        const LOGIN_URL = `${URL_PREFIX}/api/admin/find/all/contains/page?p=${page}&word=${word}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.object.users
    } catch (error) {
        console.log(error)
    }
}
