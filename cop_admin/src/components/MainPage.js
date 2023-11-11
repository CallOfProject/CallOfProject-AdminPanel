import AdminMainPageComponent from "./AdminMainPageComponent";
import SidebarComponent from "./SidebarComponent";
import ContextProvider from "./ContextProvider";
import './MainPage.css'

const MainPage = () => {
    return (
        <ContextProvider>
            <div className="main-page-root">
                <div className="main-page-side-bar">
                    <SidebarComponent/>
                </div>

                <div className="main-page-admin">
                    <AdminMainPageComponent/>
                </div>
            </div>
        </ContextProvider>
    )

}
export default MainPage;