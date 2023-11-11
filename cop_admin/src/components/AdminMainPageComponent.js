import './AdminPage.css'
import SummaryInformationComponent from "./SummaryInformationComponent";
import DrillDownChartComponent from "./DrillDownChartComponent";

const AdminMainPageComponent = () => {
    return (
        <div className="admin-page-root">
            <SummaryInformationComponent/>
            <DrillDownChartComponent/>
        </div>
    );
}

export default AdminMainPageComponent;