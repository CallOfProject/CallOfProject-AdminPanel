import {getUserInformationFromLocalStorage} from "../dto/UserDTO";
import axios from "axios";
import {PREFIX} from "../util/ConnectionUtil";
import {UserUpdateDTO} from "../dto/UserUpdateDTO";


export const findProjects = async (page: number) => {
    try {
        const LOGIN_URL = `${PREFIX}/api/project/admin/all?p=${page}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const updateProject = async (userUpdateDTO: UserUpdateDTO) => {
    try {
        const UPDATE_URL = `${PREFIX}/api/project/admin/update/user`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.put(UPDATE_URL, userUpdateDTO, {headers: {"Authorization": `Bearer ${token}`}});
        console.log("H: ", response.data.object)
        return response.data.object
    } catch (error) {
        console.log("D: ", error)
    }
}


export const removeProjects = async (username: string) => {
    try {
        const UPDATE_URL = `${PREFIX}/api/project/admin/remove/user?uname=${username}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.delete(UPDATE_URL, {
            headers: {"Authorization": `Bearer ${token}`}
        });
        return response.data.object
    } catch (error) {

        return false
    }
}


export const findProjectsWitKeyword = async (page: number, word: string) => {
    try {
        const LOGIN_URL = `${PREFIX}/api/project/admin/find/all/contains/page?p=${page}&word=${word}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.object.users
    } catch (error) {
        console.log(error)
    }
}
