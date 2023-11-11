export class UserLoginResponseDTO {
    constructor(username, accessToken, refreshToken, success)
    {
        this.username = username
        this.accessToken = accessToken
        this.refreshToken = refreshToken;
        this.success = success;
    }
}