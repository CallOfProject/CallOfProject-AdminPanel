import Button from "react-bootstrap/Button";
import {Col, FormControl, FormGroup, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import './EditUser.css'
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {UserUpdateDTO} from "../dto/UserUpdateDTO";
import {updateUser} from "../service/UserService";
import {useDispatch} from "react-redux";
import {userTableActions} from "../store";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css'

const updateUserCallback = ({dispatch}, updatedUser) => dispatch(userTableActions.updateUser(updatedUser))
const EditUserComponent = ({userInfo, show, setShow, setUserInfo}) => {

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState()
    const [middleName, setMiddleName] = useState("")
    const [lastName, setLastName] = useState()
    const [birthDate, setbirthDate] = useState()
    const [isBlocked, setBlocked] = useState(false)
    const dispatch = useDispatch()


    const handleStatus = () => setBlocked(!isBlocked)
    const handleClose = () => setShow(false);

    useEffect(() => {
        setFirstName(userInfo.first_name)
        setMiddleName(userInfo.middle_name)
        setLastName(userInfo.last_name)
        setEmail(userInfo.email)
        setBlocked(userInfo.is_account_blocked)
        setbirthDate(userInfo.birth_date.split('-').reverse().join('/'))
    }, [userInfo]);

    const handleSubmitButton = async () => {

        try {
            if (!firstName || !lastName || !email || !birthDate)
                NotificationManager.warning("Please fill all blanks!", "Warning")
            else {
                const updateDTO = new UserUpdateDTO(userInfo.username, firstName, middleName, lastName, email, isBlocked, birthDate)
                const updatedUser = await updateUser(updateDTO);
                updateUserCallback({dispatch}, updatedUser)
                NotificationManager.success('User updated successfully!', 'Success Edit');
            }
        } catch (error) {
            NotificationManager.error("User cannot updated!", "Fail Edit")
        }

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
                <NotificationContainer/>
                <Modal.Header style={{backgroundColor: "rgb(193, 219, 222)"}}>
                    <Modal.Title style={{fontWeight: "700"}}>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{backgroundColor: "rgb(193, 219, 222)"}}>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="formGridFirstName">
                                    <Form.Label style={{fontWeight: "700"}}>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name"
                                                  isInvalid={!firstName}
                                                  defaultValue={userInfo.first_name}
                                                  onChange={event => setFirstName(event.target.value)}
                                    />
                                    <FormControl.Feedback type="invalid">
                                        Please enter the first name!
                                    </FormControl.Feedback>
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="formGridMiddleName">
                                    <Form.Label style={{fontWeight: "700"}}>Middle Name</Form.Label>
                                    <Form.Control type="text" placeholder="Middle Name"
                                                  isInvalid={middleName.length === 2 &&
                                                      // eslint-disable-next-line no-mixed-operators
                                                      middleName === " " || /^\s+|\s+$/.test(middleName)}
                                                  onChange={event => setMiddleName(event.target.value)}
                                                  defaultValue={userInfo.middle_name}/>
                                    <FormControl.Feedback type="invalid">
                                        Please Enter the middle name
                                    </FormControl.Feedback>
                                </Form.Group>

                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formGridLastName">
                                    <Form.Label style={{fontWeight: "700"}}>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name"
                                                  isInvalid={!lastName}
                                                  onChange={event => setLastName(event.target.value)}
                                                  defaultValue={userInfo.last_name}/>
                                    <FormControl.Feedback type="invalid">
                                        Please Enter the last name
                                    </FormControl.Feedback>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label style={{fontWeight: "700"}}>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"
                                                  isInvalid={email.length < 5 || !email}
                                                  onChange={event => setEmail(event.target.value)}
                                                  defaultValue={userInfo.email}/>
                                    <FormControl.Feedback type="invalid">
                                        Please Enter the email
                                    </FormControl.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="formGridBirthDate">
                            <Form.Label style={{fontWeight: "700"}}>Birth Date</Form.Label>
                            <Form.Control type="date"
                                          onChange={event => setbirthDate(event.target.value.split('-').reverse().join('/'))}
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
