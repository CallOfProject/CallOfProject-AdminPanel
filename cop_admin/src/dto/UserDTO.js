import {CURRENT_USER} from "../Constants";

export const getUserInformationFromLocalStorage = () => JSON.parse(localStorage.getItem(CURRENT_USER))
export const getRole = () => JSON.parse(localStorage.getItem(CURRENT_USER)).role

export class UserDTO {
    constructor(username, accessToken, refreshToken, role) {
        this.username = username;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.role = role
    }

    storeOnLocalStorage = () => localStorage.setItem(CURRENT_USER, JSON.stringify(this))
}