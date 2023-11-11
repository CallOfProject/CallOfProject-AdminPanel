import LoginPageComponent from "./components/LoginPageComponent";
import MainPage from "./components/MainPage";
import {Provider} from "react-redux";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import store from "./store";

const router = createBrowserRouter([
    {path: '/', element: <LoginPageComponent/>},
    {path: '/home', element: <MainPage/>}
])
const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    );
}
export default App;