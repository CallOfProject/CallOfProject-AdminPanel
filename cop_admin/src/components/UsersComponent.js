import './Users.css'
import UserTableComponent from "./UserTableComponent";
import {Col} from "react-bootstrap";
import SidebarComponent from "./SidebarComponent";
import SearchAndFilterComponent from "./SearchAndFilterComponent";
import {useState} from "react";

const UsersComponent = () => {
    const [word, setWord] = useState('u')
    const [isClickSearch, setIsClickSearch] = useState(false)
    return (
        <div className="user-page-root">
            <Col className="user-page-side-component">
                <SidebarComponent/>
            </Col>

            <Col className="user-page-usertable">

                <div className="filter">
                    <SearchAndFilterComponent word={word} setWord={setWord} isClickSearch={isClickSearch} setIsClickSearch={setIsClickSearch}/>
                </div>
                <div>
                    <UserTableComponent word={word} isClickSearch={isClickSearch}/>
                </div>
            </Col>

        </div>
    );
}
export default UsersComponent;