import './AdminPage.css'
import SummaryInformationComponent from "./SummaryInformationComponent";
import DrillDownChartComponent from "./DrillDownChartComponent";
import {useEffect} from "react";
import {findAllUserCount, findNewUsersLastNday} from "../service/UserService";

const AdminMainPageComponent = () => {

    useEffect(() => {
        const fetchData = async () => {
            const total = await findAllUserCount()
            const newCount = await findNewUsersLastNday(2)
            localStorage.setItem("total_user", total)
            localStorage.setItem("new_user", newCount)
        }
        fetchData()
    });


    return (
        <div className="admin-page-root">
            <SummaryInformationComponent/>
            <div>
                <DrillDownChartComponent/>
            </div>
        </div>
    );
}

export default AdminMainPageComponent;