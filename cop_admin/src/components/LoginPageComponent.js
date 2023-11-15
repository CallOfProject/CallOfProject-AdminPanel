import React, {useEffect, useState} from "react";
import {FormControl, InputGroup, Stack} from "react-bootstrap";
import {Status} from "../Status";
import "./LoginPage.css"
import cop_logo from '../images/cop_logo.png'
import LoginService from "../service/LoginService";
import {UserLoginDTO} from "../dto/UserLoginDTO";
import {UserDTO} from "../dto/UserDTO";
import {Navigate} from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css'

const LoginPageComponent = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [usernameValidation, setUsernameValidation] = useState(Status.NONE)
    const [passwordValidation, setPasswordValidation] = useState(Status.NONE)
    const [success, setSuccess] = useState(Status.NONE)

    useEffect(() => {
        var style = document.getElementById("mywaitcursorstyle");
        if (style) {
            style.parentNode.removeChild(style);
        }
    }, []);
    const HandleUsername = (event) => setUsername(event.target.value);
    const HandlePassword = (event) => setPassword(event.target.value);

    const HandleLoginButton = async (event) => {
        event.preventDefault()
        setUsernameValidation(username.length !== 0 ? Status.SUCCESS : Status.FAIL)
        setPasswordValidation(password.length !== 0 ? Status.SUCCESS : Status.FAIL)

        if (usernameValidation === Status.SUCCESS && passwordValidation === Status.SUCCESS) {
            const loginDTO = new UserLoginDTO(username, password);

            const loginResponse = await LoginService(loginDTO);

            if (loginResponse.success) {
                const user = new UserDTO(username, loginResponse.accessToken, loginResponse.refreshToken, loginResponse.role)
                user.storeOnLocalStorage()
                NotificationManager.success(`Welcome ${username}`, "Success")
                setTimeout(() => {
                    setSuccess(Status.SUCCESS)
                }, 2000)

            } else {
                setSuccess(Status.FAIL)
                NotificationManager.error(`Invalid username or password!`, "Error")
            }
        } else {

        }

    };

    return (
        <div className="container-fluid cop-container">
            <NotificationContainer/>
            <div className="user-form">
                {success === Status.SUCCESS && success !== Status.NONE && <Navigate to="/home"/>}
                <Stack gap={3}>
                    <h2 style={{textAlign: "center"}}>
                        <img className="mb-4 cop-logo" src={cop_logo} alt=""/>
                    </h2>

                    <InputGroup className="mb3">
                 <span className="input-group-text">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                </span>
                        <FormControl
                            onChange={HandleUsername}
                            required
                            isInvalid={usernameValidation === Status.FAIL && usernameValidation !== Status.NONE}
                            isValid={usernameValidation === Status.SUCCESS && usernameValidation !== Status.NONE}
                            placeholder="username"
                            aria-label="username"
                        />

                        <FormControl.Feedback type="invalid">
                            Lütfen kullanıcı adınızı girin!
                        </FormControl.Feedback>
                    </InputGroup>


                    <InputGroup className="mb3">
                 <span className="input-group-text">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                       className="bi bi-shield-lock" viewBox="0 0 16 16">
                      <path
                          d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                      <path
                          d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"/>
                </svg>
                </span>
                        <FormControl
                            type="password"
                            onChange={HandlePassword}
                            required
                            isInvalid={passwordValidation === Status.FAIL && passwordValidation !== Status.NONE}
                            isValid={passwordValidation === Status.SUCCESS && passwordValidation !== Status.NONE}
                            placeholder="password"
                            aria-label="password"
                        />
                        <FormControl.Feedback type="invalid">
                            Lütfen parolanızı giriniz!
                        </FormControl.Feedback>
                    </InputGroup>


                    <button className="btn btn-primary w-100 py-2 login-btn" onClick={HandleLoginButton}
                            type="submit">Login
                    </button>

                </Stack>
            </div>
        </div>
    );
}

export default LoginPageComponent;