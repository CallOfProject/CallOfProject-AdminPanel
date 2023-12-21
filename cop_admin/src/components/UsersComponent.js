import './Users.css'
import UserTableComponent from "./UserTableComponent";
import {Col} from "react-bootstrap";
import SidebarComponent from "./SidebarComponent";
import SearchAndFilterComponent from "./SearchAndFilterComponent";

const UsersComponent = () => {
    return (
        <div className="user-page-root">
            <Col className="user-page-side-component">
                <SidebarComponent/>
            </Col>
            <Col className="user-page-usertable">
                <div className="filter">
                    <SearchAndFilterComponent title={"Admin-Root Page"}/>
                </div>
                <div>
                    <UserTableComponent/>
                </div>
            </Col>
        </div>
    );
}
export default UsersComponent;