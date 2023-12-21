import AdminMainPageComponent from "./AdminMainPageComponent";
import SidebarComponent from "./SidebarComponent";
import ContextProvider from "./ContextProvider";
import './MainPage.css'
import {Col} from "react-bootstrap";

const MainPage = () => {
    return (
        <ContextProvider>
            <div>
                <Col className="main-page-side-bar">
                    <SidebarComponent/>
                </Col>
                <Col className="main-page-admin">
                    <AdminMainPageComponent/>
                </Col>
            </div>
        </ContextProvider>
    )
}
export default MainPage;