import {Table} from "react-bootstrap";
import './UserTable.css'
import Button from "react-bootstrap/Button";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {useState} from "react";
import EditUserComponent from "./EditUserComponent";

const UserTableComponent = () => {
    const [clickedEdit, setClickedEdit] = useState(false)
    const [show, setShow] = useState(false);
    const userInfo = {
        fullName: "Nuri Can ÖZTÜRK",
        firstName: "Nuri",
        middleName: "Can",
        email: "can@mail.com",
        lastName: "ÖZTÜRK",
        birthDate: "25/01/1999",
        username: "nuricanozturk"
    }
    const handleEditButton = () => {
        setShow(true)
        setClickedEdit(true)
    };
    return (
        <Table striped="columns" className="table-primary table-responsive user-table table-hover table-bordered">
            {clickedEdit && <EditUserComponent show={show} setShow={setShow} userInfo={userInfo}/>}
            <thead style={{textAlign: "center", backgroundColor: "rgb(154, 179, 182)"}}>
            <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Creation Date</th>
                <th>Birth Date</th>
                <th>blocked</th>
                <th>Edit</th>
                <th>Remove</th>
            </tr>
            </thead>
            <tbody style={{textAlign: "center", color: "white"}}>
            {Array.from({length: 100}, (_, index) => <tr>
                <td>1</td>
                <td>Nuri Can ÖZTÜRK</td>
                <td>nuricanozturk</td>
                <td>can@mail.com</td>
                <td>25/01/2023</td>
                <td>25/01/1999</td>
                <td>
                    <BootstrapSwitchButton
                        checked={Math.random() < 0.3}
                        onlabel='Locked'
                        onstyle='danger'
                        offlabel='Active'
                        offstyle='success'
                        size="xs"
                        style='w-100 mx-2'
                        /*onChange={(checked: boolean) => {
                            this.setState({ isUserAdmin: checked })
                        }}*/
                    />
                </td>
                <td>
                    <Button className="btn-sm" style={{marginRight: "20px"}} onClick={handleEditButton}>
                        Edit User
                    </Button>
                </td>

                <td>
                    <Button className="btn-sm" variant="danger">
                        Remove
                    </Button>
                </td>

            </tr>)}


            </tbody>
        </Table>
    );
}
export default UserTableComponent;