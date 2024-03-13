import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useState} from "react";
import './Login.css'
import cop_logo from '../../assets/new_logo.png'
import {Navigate} from "react-router-dom";

const LoginComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);


    const handleLoginBtn = () => {
        console.log('username', username);
        console.log('password', password);
        setSuccess(true)
    };
    return (
        <div
            className="surface-card p-4 shadow-2 border-round w-full lg:w-6 align-content-center justify-content-center center-screen">
            {success && <Navigate to={"/home"}/>}
            <div className="text-center mb-5">
                <img src={cop_logo} alt="hyper" height={200} className="mb-3"/>
                <div className="my-text">
                    Call-Of-Project Admin Panel
                </div>
            </div>

            <div className="flex-column">
            <label htmlFor="username" className="block text-900 font-medium mb-2">Username</label>
                <InputText id="username" onChange={(e) => setUsername(e.target.value)} type="text"
                           placeholder="Username" className="w-full mb-3"/>

                <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                <InputText type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"
                           className="w-full mb-3"/>

                <Button label="Sign In" icon="pi pi-user" className="w-full" onClick={() => handleLoginBtn()}/>
            </div>
        </div>
    );

}

export default LoginComponent;
