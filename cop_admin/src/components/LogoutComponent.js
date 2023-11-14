import {logout} from "../service/UserService";

const LogoutComponent = () => {

    const handleLogout = async () => {
        await logout()
    };
    return (
        <div>
            Logout....
        </div>
    );
}
export default LogoutComponent;