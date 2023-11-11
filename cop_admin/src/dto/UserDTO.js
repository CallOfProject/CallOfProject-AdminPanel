import {CURRENT_USER} from "../Constants";

export class UserDTO {
    constructor(username, accessToken, refreshToken) {
        this.username = username;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    storeOnLocalStorage = () => localStorage.setItem(CURRENT_USER, JSON.stringify(this))
}