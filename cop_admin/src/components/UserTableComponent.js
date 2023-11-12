import {Table} from "react-bootstrap";
import './UserTable.css';
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import {findUsers} from "../service/UserService";
import InfiniteScroll from "react-infinite-scroll-component";
import EditUserComponent from "./EditUserComponent";
import Form from "react-bootstrap/Form";

const UserTableComponent = ({isClickSearch, word}) => {
    const [users, setUsers] = useState([]);
    const [clickedEdit, setClickedEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {

            setTimeout(async () => {
                const newUsers = await findUsers(page, word);

                if (newUsers.length > 0) {
                    setUsers(prevUsers => [...prevUsers, ...newUsers]);
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

    return (
        <div id="scrollableDiv" style={{height: "800px", overflowY: "auto", border: "2px solid rgba(34, 36, 38, .15)"}}>
            <InfiniteScroll
                next={fetchData}
                hasMore={hasMore}
                loader={<h3>Loading...</h3>}
                dataLength={users.length}
                endMessage={<h3>Finish!...</h3>}
                scrollableTarget="scrollableDiv"
            >
                <Table striped className="table-primary table-responsive user-table table-hover table-bordered">
                    {clickedEdit && <EditUserComponent show={show} setShow={setShow} userInfo={editUser}/>}
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
                                {!usr.is_account_blocked ? <Form.Check type={"radio"}>
                                    <Form.Check.Input type={"radio"} isValid checked={true}/>
                                </Form.Check> : <Form.Check type={"radio"}>
                                    <Form.Check.Input type={"radio"} isInvalid checked={true}/>
                                </Form.Check>}
                            </td>
                            <td style={{float: "left", width: "100%"}}>
                                <Button className="btn-sm" style={{marginRight: "20px"}}
                                        onClick={() => handleEditButton(usr)}>
                                    Edit
                                </Button>
                            </td>
                            <td>
                                <Button className="btn-sm" variant="danger">
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
