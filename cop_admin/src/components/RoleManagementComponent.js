import {Col} from "react-bootstrap";
import SidebarComponent from "./SidebarComponent";
import RoleAuthorizationComponent from "./RoleAuthorizationComponent";
import SearchAndFilterComponent from "./SearchAndFilterComponent";

const RoleManagementComponent = () => {
    return (
        <div className="user-page-root">
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