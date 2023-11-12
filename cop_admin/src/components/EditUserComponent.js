import Button from "react-bootstrap/Button";
import {Col, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import './EditUser.css'
import BootstrapSwitchButton from "bootstrap-switch-button-react";

const EditUserComponent = ({userInfo, show, setShow}) => {


    const handleClose = () => setShow(false);

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
                                                  defaultValue={userInfo.first_name}/>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="formGridMiddleName">
                                    <Form.Label style={{fontWeight: "700"}}>Middle Name</Form.Label>
                                    <Form.Control type="text" placeholder="Middle Name"
                                                  defaultValue={userInfo.middle_name}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formGridLastName">
                                    <Form.Label style={{fontWeight: "700"}}>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" defaultValue={userInfo.last_name}/>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label style={{fontWeight: "700"}}>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" defaultValue={userInfo.email}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="formGridBirthDate">
                            <Form.Label style={{fontWeight: "700"}}>Birth Date</Form.Label>
                            <Form.Control type="date" defaultValue={userInfo.birth_date.split('/').reverse().join('-')}/>
                        </Form.Group>

                        <Row>
                            <Form.Label style={{fontWeight: "700"}}>Is Locked</Form.Label>
                            <BootstrapSwitchButton
                                checked={userInfo.is_account_blocked}
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
                    <Button variant="primary">Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditUserComponent;
