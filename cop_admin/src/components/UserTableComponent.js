import {Table} from "react-bootstrap";
import './UserTable.css';
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {findUsers, removeUser} from "../service/UserService";
import InfiniteScroll from "react-infinite-scroll-component";
import EditUserComponent from "./EditUserComponent";
import Form from "react-bootstrap/Form";
import {useDispatch, useSelector} from "react-redux";
import {userTableActions} from "../store";
import 'react-notifications/lib/notifications.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';

const load = ({dispatch}, users) => dispatch(userTableActions.load(users))
const removeAllUsers = ({dispatch}) => dispatch(userTableActions.removeAll())
const deleteUser = ({dispatch}, user) => dispatch(userTableActions.removeUser(user))


const UserTableComponent = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.userTable.users)

    const [clickedEdit, setClickedEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        removeAllUsers({dispatch})
        fetchData();
    }, []);


    const fetchData = async () => {
        try {

            setTimeout(async () => {
                const newUsers = await findUsers(page);
                if (newUsers.length > 0) {
                    load({dispatch}, newUsers)
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
        setEditUser(usr);
    };

    const handleRemoveButton = async user => {
        try {
            const isRemoved = await removeUser(user.username);
            if (isRemoved) {
                deleteUser({dispatch}, user.username)
                NotificationManager.success("User removed Successfully!", "Success")
            }
            else NotificationManager.errorMonitor("User cannot removed!", "Error")
        } catch (error) {
            NotificationManager.success("User cannot removed!", "Error")
        }
    };
    return (
        <div id="scrollableDiv" style={{height: "800px", overflowY: "auto", border: "2px solid rgba(34, 36, 38, .15)"}}>
            <NotificationContainer/>
            <InfiniteScroll
                next={fetchData}
                hasMore={hasMore}
                loader={<h3>Loading...</h3>}
                dataLength={users.length}
                endMessage={<h3>Finish!...</h3>}
                scrollableTarget="scrollableDiv"
            >
                <Table striped className="table-primary table-responsive user-table table-hover table-bordered">
                    {clickedEdit && <EditUserComponent setClickEdit={setClickedEdit} show={show} setShow={setShow}
                                                       userInfo={editUser} setUserInfo={setEditUser}/>}
                    <thead style={{textAlign: "center", backgroundColor: "rgb(154, 179, 182)"}}>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Creation Date</th>
                        <th>Birth Date</th>
                        <th>Active</th>
                        <th>Edit</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody style={{textAlign: "center", color: "white"}}>
                    {users.map((usr, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{usr.first_name} {usr.middle_name} {usr.last_name}</td>
                            <td>{usr.username}</td>
                            <td>{usr.email}</td>
                            <td>{usr.creation_date}</td>
                            <td>{usr.birth_date}</td>
                            <td>
                                {usr.is_account_blocked ? <Form.Check type={"radio"}>
                                    <Form.Check.Input type={"radio"} isInvalid checked={true}/>
                                </Form.Check> : <Form.Check type={"radio"}>
                                    <Form.Check.Input type={"radio"} isValid checked={true}/>
                                </Form.Check>}
                            </td>
                            <td style={{float: "left", width: "100%"}}>
                                <Button className="btn-sm" style={{marginRight: "20px"}}
                                        onClick={() => handleEditButton(usr)}>
                                    Edit
                                </Button>
                            </td>
                            <td>
                                <Button className="btn-sm" variant="danger"
                                        onClick={() => handleRemoveButton(usr)}>
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
};

export default UserTableComponent;
