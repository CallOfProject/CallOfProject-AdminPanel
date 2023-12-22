import {useState} from "react";
import {Col, FormGroup, Modal, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './ProjectEditComponent.css'

const ProjectEditComponent = ({editProject, show, setShow, setEditProject}) => {
    const [applicationDeadline, setApplicationDeadline] = useState()
    const [formData, setFormData] = useState({
        userId: editProject.userId,
        projectId: editProject.projectId,
        projectImage: editProject.projectImage,
        projectName: editProject.projectName,
        projectSummary: editProject.projectSummary,
        projectDescription: editProject.projectDescription,
        projectAim: editProject.projectAim,
        applicationDeadline: editProject.applicationDeadline,
        expectedCompletionDate: editProject.expectedCompletionDate,
        maxParticipantCount: editProject.maxParticipantCount,
        technicalRequirements: editProject.technicalRequirements,
        specialRequirements: editProject.specialRequirements,
        projectAccessType: editProject.projectAccessType,
        professionLevel: editProject.professionLevel,
        sector: editProject.sector,
        degree: editProject.degree,
        projectLevel: editProject.projectLevel,
        interviewType: editProject.interviewType,
        feedbackTimeRange: editProject.feedbackTimeRange,
        startDate: editProject.startDate,
        tags: editProject.tags
    });
    const handleClose = () => setShow(false);
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmitButton = (e) => {
        e.preventDefault();
        /*
                updateProject(formData);
        */
        handleClose(); // Close the modal
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEditProject(formData);
    };
    return (
        <div>
            <Modal
                className="edit-project-modal"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                dialogClassName="modal-90w"
            >
                <Modal.Header className="edit-project-header" style={{backgroundColor: "rgb(193, 219, 222)"}}>
                    <Modal.Title style={{fontWeight: "700"}}>Edit Project</Modal.Title>
                </Modal.Header>

                <Modal.Body className="edit-project-body"
                            style={{backgroundColor: "rgb(193, 219, 222)", width: "auto"}}>
                    <Form onSubmit={handleSubmitButton}>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="formProjectName">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Project Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="projectName"
                                        placeholder="Project Name"
                                        value={formData.projectName}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup controlId="formProjectImage">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Project Image
                                        URL</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="projectImage"
                                        placeholder="Project Image URL"
                                        value={formData.projectImage}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>


                        <Col md={12}>
                            <FormGroup controlId="formProjectDescription">
                                <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Project
                                    Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    style={{height: "130px"}}
                                    name="projectDescription"
                                    placeholder="Project Description"
                                    value={formData.projectDescription}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="formProjectSummary">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Project
                                        Summary</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="projectSummary"
                                        style={{height: "100px"}}
                                        placeholder="Project Summary"
                                        value={formData.projectSummary}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup controlId="formProjectAim">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Project Aim</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        style={{height: "100px"}}
                                        name="projectAim"
                                        placeholder="Project Aim"
                                        value={formData.projectAim}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>

                            <Col md={6}>
                                <FormGroup controlId="applicationDeadline">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Application
                                        Deadline</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="applicationDeadline"
                                        placeholder="Project Aim"
                                        value={formData.applicationDeadline}
                                        /*onChange={event => setApplicationDeadline(event.target.value.split('-').reverse().join('/'))}*/
                                        /*defaultValue={editProject.applicationDeadline.split('/').reverse().join('-')}*/
                                    />
                                </FormGroup>
                            </Col>


                            <Col md={6}>
                                <FormGroup controlId="expectedCompletionDate">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Expected Completion
                                        Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="expectedCompletionDate"
                                        placeholder="Expected Completion Date"
                                        value={formData.expectedCompletionDate}
                                        /*onChange={event => setApplicationDeadline(event.target.value.split('-').reverse().join('/'))}*/
                                        /*defaultValue={new Date().getDate().split('/').reverse().join('-')}*/
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="maxParticipantCount">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Max
                                        Participant</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="maxParticipantCount"
                                        placeholder="Max Participant"
                                        value={formData.maxParticipantCount}
                                        /*onChange={event => setApplicationDeadline(event.target.value.split('-').reverse().join('/'))}*/
                                        /*defaultValue={new Date().getDate().split('/').reverse().join('-')}*/
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup controlId="startDate">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Start Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="startDate"
                                        placeholder="Start Date"
                                        value={formData.startDate}
                                        /*onChange={event => setApplicationDeadline(event.target.value.split('-').reverse().join('/'))}*/
                                        /*defaultValue={new Date().getDate().split('/').reverse().join('-')}*/
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="technicalRequirements">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Technical
                                        Requirements</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        style={{height: "100px"}}
                                        name="technicalRequirements"
                                        placeholder="Technical Requirements"
                                        value={formData.technicalRequirements}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup controlId="speacialRequirements">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Special
                                        Requirements</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="specialRequirements"
                                        style={{height: "100px"}}
                                        placeholder="Special Requirements"
                                        value={formData.specialRequirements}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Access Type</Form.Label>
                                <Form.Select aria-label="Access Type">
                                    <option>Access Type</option>
                                    <option value="PUBLIC">Public</option>
                                    <option value="PRIVATE">Private</option>

                                </Form.Select>
                            </Col>

                            <Col md={6}>
                                <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Profession Level</Form.Label>
                                <Form.Select aria-label="Access Type">
                                    <option>Profession Level</option>
                                    <option value="ENTRY_LEVEL">Entry Level</option>
                                    <option value="INTERMEDIATE">Intermediate</option>
                                    <option value="EXPERT">Expert</option>

                                </Form.Select>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={6}>
                                <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Degree</Form.Label>
                                <Form.Select aria-label="Degree">
                                    <option>Recommended Degree</option>
                                    <option value="BACHELOR">Bachelor</option>
                                    <option value="PHD">phD</option>
                                    <option value="MASTER">Master</option>

                                </Form.Select>
                            </Col>

                            <Col md={6}>
                                <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Project Level</Form.Label>
                                <Form.Select aria-label="Project Level">
                                    <option>Project Level</option>
                                    <option value="ENTRY_LEVEL">Entry Level</option>
                                    <option value="INTERMEDIATE">Intermediate</option>
                                    <option value="EXPERT">Expert</option>

                                </Form.Select>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={6}>
                                <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Interview Type</Form.Label>
                                <Form.Select aria-label="Interview Type">
                                    <option>Interview Type</option>
                                    <option value="CODE">Coding</option>
                                    <option value="TEST">Test</option>
                                </Form.Select>
                            </Col>

                            <Col md={6}>
                                <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Feedback Range</Form.Label>
                                <Form.Select aria-label="Feedback Range">
                                    <option>Feedback Range</option>
                                    <option value="ONE_WEEK">One Week</option>
                                    <option value="TWO_WEEK">Two Week</option>
                                    <option value="ONE_MONTH">One Month</option>

                                </Form.Select>
                            </Col>
                        </Row>

                        <Col md={12}>
                            <FormGroup controlId="tags">
                                <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Project Tags</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    style={{height: "100px"}}
                                    name="tags"
                                    placeholder="Enter tags with comma"
                                    value={formData.tags}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>

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
}

export default ProjectEditComponent;