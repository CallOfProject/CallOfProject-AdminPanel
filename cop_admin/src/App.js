import LoginPageComponent from "./components/LoginPageComponent";
import MainPage from "./components/MainPage";
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import store from "./store";
import UsersComponent from "./components/UsersComponent";
import EditUserComponent from "./components/EditUserComponent";
import RoleManagementComponent from "./components/RoleManagementComponent";

const router = createBrowserRouter([
    {path: '/', element: <LoginPageComponent/>},
    {path: '/home', element: <MainPage/>},
    {path: '/users', element: <UsersComponent/>},
    {path: '/authorizate-management', element: <RoleManagementComponent/>},
    {path: '/edit-user', element: <EditUserComponent/>}

])
const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    );
}
export default App;