import {PROJECT_URL_PREFIX} from "../ConnectionUtil";
import {getUserInformationFromLocalStorage} from "../dto/UserDTO";
import axios from "axios";

export const findProjects = async (page) => {
    try {
        const LOGIN_URL = `${PROJECT_URL_PREFIX}/api/admin/find/all/page?p=${page}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.object.users
    } catch (error) {
        console.log(error)
    }
}


export const updateProject = async (userUpdateDTO) => {
    try {
        const UPDATE_URL = `${PROJECT_URL_PREFIX}/api/admin/update/user`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.put(UPDATE_URL, userUpdateDTO, {headers: {"Authorization": `Bearer ${token}`}});
        console.log("H: ", response.data.object)
        return response.data.object
    } catch (error) {
        console.log("D: ", error)
    }
}


export const removeProjects = async (username) => {
    try {
        const UPDATE_URL = `${PROJECT_URL_PREFIX}/api/admin/remove/user?uname=${username}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.delete(UPDATE_URL, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        return response.data.object
    } catch (error) {

        return false
    }
}


export const findProjectsWitKeyword = async (page, word) => {
    try {
        const LOGIN_URL = `${PROJECT_URL_PREFIX}/api/admin/find/all/contains/page?p=${page}&word=${word}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.object.users
    } catch (error) {
        console.log(error)
    }
}
