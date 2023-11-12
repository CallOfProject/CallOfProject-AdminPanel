import Button from "react-bootstrap/Button";
import {Col, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import './EditUser.css'

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
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{backgroundColor: "rgb(193, 219, 222)"}}>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formGridFirstName">
                                    <Form.Label style={{fontWeight: "700"}}>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name"
                                                  defaultValue={userInfo.firstName}/>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group controlId="formGridMiddleName">
                                    <Form.Label style={{fontWeight: "700"}}>Middle Name</Form.Label>
                                    <Form.Control type="text" placeholder="Middle Name"
                                                  defaultValue={userInfo.middleName}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formGridLastName">
                                    <Form.Label style={{fontWeight: "700"}}>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" defaultValue={userInfo.lastName}/>
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
                            <Form.Control type="date" defaultValue={userInfo.birthDate.split('/').reverse().join('-')}/>
                        </Form.Group>
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
