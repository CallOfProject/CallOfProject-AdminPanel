import axios from "axios";
import {getUserInformationFromLocalStorage} from "../dto/UserDTO";
import {PREFIX} from "../util/ConnectionUtil";
import {UserUpdateDTO} from "../dto/UserUpdateDTO";
import {UserProfile, UserProfileUpdateDTO} from "../dto/Models";

export const findUsers = async (page: number) => {
    try {
        const LOGIN_URL = `${PREFIX}/api/auth/admin/find/all/page?p=${page}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.object.users
    } catch (error) {
        console.log(error)
    }
}
export const findUserProfile = async (userId: string) => {
    try {
        //http://localhost:3131/api/auth/users/find/user/profile/username?uname=cop_root
        const LOGIN_URL = `${PREFIX}/api/auth/users/find/user/profile/id?uid=${userId}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL, {headers: {"Authorization": `Bearer ${token}`}});
        const object = response.data.object

        console.log("Object: ", object)
        return new UserProfile(object.cv, object.profile_photo, object.about_me, object.user_rate, object.user_feedback_rate)
    } catch (error) {
        console.log(error)
    }
}


export const updateUser = async (userUpdateDTO: UserUpdateDTO) => {
    try {
        const UPDATE_URL = `${PREFIX}/api/auth/admin/update/user`
        console.log("URL: ", UPDATE_URL)
        const token = getUserInformationFromLocalStorage().accessToken;
        console.log(`Bearer ${token}`)

        const response = await axios.put(UPDATE_URL, userUpdateDTO, {headers: {"Authorization": `Bearer ${token}`}});
        console.log("H: ", response.data.object)
        return response.data.object
    } catch (error) {
        console.log("D: ", error)
    }
}

export const updateUserProfile = async (userUpdateDTO: UserProfileUpdateDTO, photo: File | null, cv: File | null) => {
    try {
        const formData = new FormData();
        //formData.append('dto', JSON.stringify(userUpdateDTO));
        console.log("User Update DTO: ", userUpdateDTO)
        formData.append("user_id", userUpdateDTO.user_id)
        formData.append("about_me", userUpdateDTO.about_me)
        if (photo) {
            console.log("Photo: ", photo.name)
            formData.append('photo', photo);
        }
        if (cv) {
            console.log("CV: ", cv.name)
            formData.append('cv', cv);
        }

        console.log("Form Data: ", formData)

        const UPDATE_URL = `${PREFIX}/api/auth/users/update/user/profile`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.post(UPDATE_URL, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const removeUser = async (username: string) => {
    try {
        const UPDATE_URL = `${PREFIX}/api/auth/admin/remove/user?uname=${username}`
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
        const LOGOUT_URL = `${PREFIX}/api/auth/authenticate/logout`
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
        const ALL_USER_COUNT_URL = `${PREFIX}/api/auth/admin/find/user/all/count`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(ALL_USER_COUNT_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const findNewUsersLastNday = async (day: number) => {
    try {
        const NEW_USER_COUNT_URL = `${PREFIX}/api/auth/admin/find/user/all/new?n=${day}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(NEW_USER_COUNT_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const findUsersWitKeyword = async (page: number, word: string) => {
    try {
        const LOGIN_URL = `${PREFIX}/api/auth/admin/find/all/contains/page?p=${page}&word=${word}`
        const token = getUserInformationFromLocalStorage().accessToken;
        const response = await axios.get(LOGIN_URL, {headers: {"Authorization": `Bearer ${token}`}});
        return response.data.object.users
    } catch (error) {
        console.log(error)
    }
}
