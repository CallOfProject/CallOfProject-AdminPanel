import React, {useEffect, useState} from 'react';
import './Sidebar.css'
import cop_logo from '../images/cop_logo.png'
import {logout} from "../service/UserService";
import {Navigate} from "react-router-dom";
import {getRole} from "../dto/UserDTO";

const SidebarComponent = () => {
    const [logoutSuccess, setLogoutSuccess] = useState(false)
    const [isVisibleAuthPage, setIsVisibleAuthPage] = useState(false)

    useEffect(() => {
        if (getRole() === "ROLE_ROOT")
            setIsVisibleAuthPage(true)
    }, []);
    const handleLogout = () => {
        const css = "* { cursor: wait; !important}";
        const style = document.createElement("style");

        style.type = "text/css";
        style.id = "mywaitcursorstyle";
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
        setTimeout(async () => {
            const status = await logout()
            setLogoutSuccess(status)
        }, 600)
    };
    return (
        <div className="flex-shrink-0 p-3 sidebar" style={{backgroundColor: "rgb(154, 179, 182)"}}>
            {logoutSuccess && <Navigate to={"/"}/>}
            <a href="/home"
               className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
                <img className="cop-image" src={cop_logo} height="100px" width="280px" alt="cop_logo"/>
            </a>

            <ul className="list-unstyled ps-0 sidebar-component-list">
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 sidebar-btn"
                            data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                        Users
                    </button>
                    <div className="collapse show" id="home-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                                <a href="/users"
                                   className="link-body-emphasis d-inline-flex text-decoration-none rounded">
                                    Users
                                </a>
                            </li>
                            {isVisibleAuthPage && <li>
                                <a href="/authorizate-management"
                                   className="link-body-emphasis d-inline-flex text-decoration-none rounded">Authorize</a>
                            </li>}
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 sidebar-btn"
                            data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                        Projects
                    </button>
                    <div className="collapse" id="dashboard-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a href="#"
                                   className="link-body-emphasis d-inline-flex text-decoration-none rounded">Projects</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 sidebar-btn"
                            data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                        Tickets
                    </button>
                    <div className="collapse" id="orders-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a href="#"
                                   className="link-body-emphasis d-inline-flex text-decoration-none rounded">Tickets</a>
                            </li>
                        </ul>
                    </div>
                </li>


                <li className="border-top my-3"></li>


                <li className="mb-1">
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 sidebar-btn"
                            data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                        Account
                    </button>
                    <div className="collapse" id="account-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a href="#"
                                   className="link-body-emphasis d-inline-flex text-decoration-none rounded">Profile</a>
                            </li>
                            <li>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a href="#"
                                   className="link-body-emphasis d-inline-flex text-decoration-none rounded">Settings</a>
                            </li>
                            <li><a href={"/"} onClick={handleLogout}
                                   className="link-body-emphasis d-inline-flex text-decoration-none rounded">Sign
                                out</a>
                            </li>
                        </ul>
                    </div>
                </li>

                <li className="border-top my-3"></li>

            </ul>
        </div>
    );
}

export default SidebarComponent;
