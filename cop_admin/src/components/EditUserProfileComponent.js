import {CardTitle, Image, ListGroup, Modal, Row} from "react-bootstrap";
import {NotificationContainer} from "react-notifications";
import Button from "react-bootstrap/Button";
import React from "react";
import './EditUserProfile.css'
import cop_logo from '../images/new_logo.png'
import EditableContentComponent from "./EditableContentComponent";

const EditUserProfileComponent = ({userInfo, show, setShow, setClickEditProfile}) => {

    const handleClose = () => {
        setShow(false);
        setClickEditProfile(false);
    }

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

                <Modal.Body className="custom-modal-body">
                    <Image className="profile-image" src={cop_logo} rounded/>
                    <Row>
                        <input type={"file"}/>
                        <ListGroup>
                            <ListGroup.Item>
                                <CardTitle style={{fontWeight: "700"}}>Education</CardTitle>
                                <EditableContentComponent/>
                            </ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Row>
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
}

export default EditUserProfileComponent;