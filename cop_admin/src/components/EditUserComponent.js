import Button from "react-bootstrap/Button";
import {Col, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import './EditUser.css'
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {UserUpdateDTO} from "../dto/UserUpdateDTO";
import {updateUser} from "../service/UserService";

const EditUserComponent = ({userInfo, show, setShow, setUserInfo}) => {

    const [email, setEmail] = useState()
    const [firstName, setFirstName] = useState()
    const [middleName, setMiddleName] = useState()
    const [lastName, setLastName] = useState()
    const [birthDate, setbirthDate] = useState()
    const [isBlocked, setBlocked] = useState()
    const [active, setActive] = useState()

    const handleClose = () => setShow(false);

    useEffect(() => {
        setFirstName(userInfo.first_name)
        setMiddleName(userInfo.middle_name)
        setLastName(userInfo.last_name)
        setEmail(userInfo.email)
        setBlocked(userInfo.is_account_blocked)
        setbirthDate(userInfo.birth_date.split('-').reverse().join('/'))
    }, []);

    const handleSubmitButton = async () => {

        const updateDTO = new UserUpdateDTO(firstName, middleName, lastName, email, !active, birthDate)
        await updateUser(updateDTO);
        const info = {
            first_name: updateDTO.first_name,
            middle_name: updateDTO.middle_name,
            last_name: updateDTO.last_name,
            email: updateDTO.email,
            is_account_blocked: updateDTO.is_account_blocked,
            birth_date: updateDTO.birth_date
        }

        setUserInfo(info)
    };
    const handleStatus = (event) => {
        setBlocked(!isBlocked)
    };
    return (
        <div>
            <Modal
                className="edit-user-modal"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                dialogClassName="modal-90w">

                <Modal.Header style={{backgroundColor: "rgb(193, 219, 222)"}}>
                    <Modal.Title style={{fontWeight: "700"}}>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{backgroundColor: "rgb(193, 219, 222)"}}>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formGridFirstName">
                                    <Form.Label style={{fontWeight: "700"}}>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name"
                                                  defaultValue={userInfo.first_name}
                                                  onChange={event => setFirstName(event.target.value)}
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="formGridMiddleName">
                                    <Form.Label style={{fontWeight: "700"}}>Middle Name</Form.Label>
                                    <Form.Control type="text" placeholder="Middle Name"
                                                  onChange={event => setMiddleName(event.target.value)}
                                                  defaultValue={userInfo.middle_name}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formGridLastName">
                                    <Form.Label style={{fontWeight: "700"}}>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name"
                                                  onChange={event => setLastName(event.target.value)}
                                                  defaultValue={userInfo.last_name}/>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label style={{fontWeight: "700"}}>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"
                                                  onChange={event => setEmail(event.target.value)}
                                                  defaultValue={userInfo.email}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="formGridBirthDate">
                            <Form.Label style={{fontWeight: "700"}}>Birth Date</Form.Label>
                            <Form.Control type="date"
                                          onChange={event => setbirthDate(event.target.value)}
                                          defaultValue={userInfo.birth_date.split('/').reverse().join('-')}/>
                        </Form.Group>

                        <Row>
                            <Form.Label style={{fontWeight: "700"}}>Is Locked</Form.Label>
                            <BootstrapSwitchButton
                                onChange={handleStatus}
                                checked={isBlocked}
                                onlabel='Locked'
                                onstyle='danger'
                                offlabel='Active'
                                offstyle='success'
                                size="sm"
                                style='w-50 mx-2'
                            />
                        </Row>

                    </Form>
                </Modal.Body>

                <Modal.Footer style={{backgroundColor: "rgb(193, 219, 222)"}}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmitButton}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditUserComponent;
