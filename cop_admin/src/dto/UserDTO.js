import {CURRENT_USER} from "../Constants";

export const getUserInformationFromLocalStorage = () => JSON.parse(localStorage.getItem(CURRENT_USER))
export const getRole = () => JSON.parse(localStorage.getItem(CURRENT_USER)).role
export const getUserID = () => JSON.parse(localStorage.getItem(CURRENT_USER)).userId

export class UserDTO {
    constructor(username, accessToken, refreshToken, role, isLocked, userId) {
        this.userId = userId;
        this.username = username;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.role = role
        this.isLocked = isLocked;
    }

    storeOnLocalStorage = () => localStorage.setItem(CURRENT_USER, JSON.stringify(this))
}