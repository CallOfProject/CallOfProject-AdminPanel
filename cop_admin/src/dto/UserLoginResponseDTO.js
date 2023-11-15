export class UserLoginResponseDTO {
    constructor(username, accessToken, refreshToken, success, role)
    {
        this.role = role;
        this.username = username
        this.accessToken = accessToken
        this.refreshToken = refreshToken;
        this.success = success;
    }
}