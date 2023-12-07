import {Col} from "react-bootstrap";
import SidebarComponent from "./SidebarComponent";
import SearchAndFilterComponent from "./SearchAndFilterComponent";
import ProjectTableComponent from "./ProjectTableComponent";
import './Projects.css'

const ProjectsComponent = () => {

    return (
        <div className="project-page-root">
            <Col className="user-page-side-component">
                <SidebarComponent/>
            </Col>

            <Col className="project-page-projecttable">

                <div className="filter">
                    <SearchAndFilterComponent title={"Projects Page"}/>
                </div>
                <div>
                    <ProjectTableComponent/>
                </div>
            </Col>

        </div>
    );
}
export default ProjectsComponent;