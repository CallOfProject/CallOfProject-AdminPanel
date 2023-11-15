import InfiniteScroll from "react-infinite-scroll-component";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {Tag, TagGroup} from 'rsuite';
import './tag.css'
import {findUsers} from "../service/UserService";
import {useDispatch, useSelector} from "react-redux";
import {userTableActions} from "../store";
import {giveAdminRole, removeAdminRole} from "../service/RoleManagementService";
import 'react-notifications/lib/notifications.css'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {getRole} from "../dto/UserDTO";

const load = ({dispatch}, users) => dispatch(userTableActions.load(users))
const removeAllUsers = ({dispatch}) => dispatch(userTableActions.removeAll())
const updateUserCallback = ({dispatch}, updatedUser) => dispatch(userTableActions.updateUser(updatedUser))
const RoleAuthorizationComponent = () => {
    const dispatch = useDispatch()
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const users = useSelector(state => state.userTable.users)

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
    const handleGiveAdminRoleButton = async (user) => {
        try {
            const role = getRole()
            if (role !== "ROLE_ROOT") {
                NotificationManager.error(`Permission Denied!`, "Error")
                return
            }
            const result = await giveAdminRole(user.username);

            if (result === true) {
                const role = {
                    name: "ROLE_ADMIN"
                };
                let updatedUser;
                if (!Object.isFrozen(user) && !Object.isSealed(user) && !Object.isFrozen(user.roles)) {
                    user.roles.push(role);
                    updatedUser = {...user};
                } else {
                    updatedUser = {
                        ...user,
                        roles: [...user.roles, role]
                    };
                }
                updateUserCallback({dispatch}, updatedUser);
                NotificationManager.success(`Admin role assigned to ${user.username}`, "Success")
            } else NotificationManager.info(`${user.username} has admin role already!`, "Information")
        } catch (error) {
            NotificationManager.warning(`Admin role assigned operation failed!`, "Fail")
        }
    };

    const handleRemoveAdminRole = async (user) => {
        try {
            const role = getRole()
            if (role !== "ROLE_ROOT") {
                NotificationManager.error(`Permission Denied!`, "Error")
                return
            }
            const result = await removeAdminRole(user.username);
            if (result === true) {
                const updatedUser = {
                    ...user,
                    roles: user.roles.filter(role => role.name !== "ROLE_ADMIN")
                };
                updateUserCallback({dispatch}, updatedUser);
                NotificationManager.success(`Admin role removed from ${user.username}`, "Success")
            } else NotificationManager.info(`${user.username} has not admin role!`, "Information")
        } catch (error) {
            NotificationManager.warning(`Admin role removed operation failed!`, "Fail")
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
                    <thead style={{textAlign: "center", backgroundColor: "rgb(154, 179, 182)"}}>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Roles</th>
                        <th>Give Admin Role</th>
                        <th>Remove Admin Role</th>
                    </tr>
                    </thead>
                    <tbody style={{textAlign: "center", color: "white"}}>
                    {users.map((usr, idx) => (
                        <tr>
                            <td>{idx + 1}</td>
                            <td>{usr.username}</td>
                            <td>

                                <TagGroup>
                                    {usr.roles.map((role, role_idx) =>
                                        <Tag
                                            color={role.name === "ROLE_USER" ? "violet" :
                                                role.name === "ROLE_ADMIN" ? "red" :
                                                    "blue"}>{role.name}
                                        </Tag>
                                    )}

                                </TagGroup>
                            </td>
                            <td>
                                <Button className="btn-sm" variant="success"
                                        onClick={() => handleGiveAdminRoleButton(usr)}>
                                    Give Role
                                </Button>
                            </td>
                            <td>
                                <Button className="btn-sm" variant="danger"
                                        onClick={() => handleRemoveAdminRole(usr)}>
                                    Remove Role
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
export default RoleAuthorizationComponent;