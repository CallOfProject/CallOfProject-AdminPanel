import {Col} from "react-bootstrap";
import SidebarComponent from "./SidebarComponent";
import RoleAuthorizationComponent from "./RoleAuthorizationComponent";
import SearchAndFilterComponent from "./SearchAndFilterComponent";
import {useEffect, useState} from "react";
import {getRole} from "../dto/UserDTO";
import {Navigate} from "react-router-dom";

const RoleManagementComponent = () => {
  /*  const [invalidPage, setInvalidPage] = useState(false)
    useEffect(() => {
        const role = getRole()
        if (role !== "ROLE_ROOT")
        {
            setInvalidPage(true)
        }
    }, []);*/
    return (
        <div className="user-page-root">
        {/*    {invalidPage && <Navigate to={"/home"}/>}*/}
            <Col className="user-page-side-component">
                <SidebarComponent/>
            </Col>

            <Col className="user-page-usertable">
                <div className="filter">
                    <SearchAndFilterComponent title={"Root Panel"}/>
                </div>
                <div>
                    <RoleAuthorizationComponent/>
                </div>
            </Col>

        </div>
    );
}
export default RoleManagementComponent;