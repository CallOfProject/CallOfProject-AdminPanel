export class UserUpdateDTO {

    constructor(username,first_name, middle_name, last_name, email, is_account_blocked, birth_date, userId) {
        this.userId = userId
        this.first_name = first_name;
        this.username = username;
        this.middle_name = middle_name;
        this.last_name = last_name;
        this.email = email;
        this.is_account_blocked = is_account_blocked;
        this.birth_date = birth_date;

        console.log(this)
    }

}