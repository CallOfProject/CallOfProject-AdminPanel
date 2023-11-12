import './AdminPage.css'
import SummaryInformationComponent from "./SummaryInformationComponent";
import DrillDownChartComponent from "./DrillDownChartComponent";

const AdminMainPageComponent = () => {
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