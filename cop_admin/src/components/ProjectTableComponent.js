import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {removeUser} from "../service/UserService";
import {NotificationContainer, NotificationManager} from "react-notifications";
import InfiniteScroll from "react-infinite-scroll-component";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {projectTableActions} from "../store";
import {findProjects} from "../service/ProjectService";
import ProjectEditComponent from "./ProjectEditComponent";


const load = ({dispatch}, projects) => dispatch(projectTableActions.load(projects))
const removeAllProjects = ({dispatch}) => dispatch(projectTableActions.removeAll())
const deleteProject = ({dispatch}, project) => dispatch(projectTableActions.removeProject(project))

const ProjectTableComponent = () => {
    const dispatch = useDispatch()
    const projects = useSelector(state => state.projectTable.projects)

    const [clickedEdit, setClickedEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [editProject, setEditProject] = useState(null);

    useEffect(() => {
        removeAllProjects({dispatch})
        fetchData();
    }, []);


    const fetchData = async () => {
        try {

            setTimeout(async () => {
                const newProjects = await findProjects(page);
                if (newProjects.length > 0) {
                    load({dispatch}, newProjects)
                    setPage(page + 1)
                } else {
                    setHasMore(false);
                }
            }, 1000);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleEditButton = (usr) => {
        setShow(true);
        setClickedEdit(true);
        setEditProject(usr);
    };

    const handleRemoveButton = async user => {
        try {
            const isRemoved = await removeUser(user.username);
            if (isRemoved) {
                deleteProject({dispatch}, user.username)
                NotificationManager.success("Project removed Successfully!", "Success")
            } else NotificationManager.error("Permission Denied", "Permission denied!")
        } catch (error) {
            NotificationManager.error("Permission Denied", "Permission denied!")
        }
    };
    return (
        <div id="scrollableDiv" style={{height: "800px", overflowY: "auto", border: "2px solid rgba(34, 36, 38, .15)"}}>
            <NotificationContainer/>
            <InfiniteScroll
                next={fetchData}
                hasMore={hasMore}
                loader={<h3>Loading...</h3>}
                dataLength={projects.length}
                endMessage={<h3>Finish!...</h3>}
                scrollableTarget="scrollableDiv"
            >
                <Table striped className="table-primary table-responsive user-table table-hover table-bordered">
                    {clickedEdit && <ProjectEditComponent setClickEdit={setClickedEdit} show={show} setShow={setShow}
                                                       editProject={editProject} setEditProject={setEditProject}/>}
                    <thead style={{textAlign: "center", backgroundColor: "rgb(154, 179, 182)"}}>
                    <tr>
                        <th>#</th>
                        <th>Project Title</th>
                        <th>Project Owner</th>
                        <th>Participant Count</th>
                        <th>Start Date</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody style={{textAlign: "center", color: "white"}}>
                    {projects.map((project, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{project.project_title}</td>
                            <td>{project.project_owner_name}</td>
                            <td>{project.max_participant}</td>
                            <td>{project.start_date}</td>
                            <td style={{float: "left", width: "100%"}}>
                                <Button className="btn-sm" style={{marginRight: "20px"}}
                                        onClick={() => handleEditButton(project)}>
                                    Edit
                                </Button>
                            </td>
                            <td>
                                <Button className="btn-sm" variant="danger"
                                        onClick={() => handleRemoveButton(project)}>
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </InfiniteScroll>
        </div>
    );
}

export default ProjectTableComponent;