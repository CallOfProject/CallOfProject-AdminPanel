import {useEffect, useState} from "react";
import {Col, FormGroup, Modal, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './ProjectEditComponent.css'
import {ProjectUpdateDTO} from "../dto/ProjectUpdateDTO";
import {getUserID} from "../dto/UserDTO";
import * as FileSaver from 'file-saver';

const ProjectEditComponent = ({editProject, show, setShow, setEditProject}) => {
    const [projectImage, setProjectImage] = useState()
    const [projectName, setProjectName] = useState()
    const [projectSummary, setProjectSummary] = useState()
    const [projectDescription, setProjectDescription] = useState()
    const [projectAim, setProjectAim] = useState()
    const [maxParticipantCount, setMaxParticipantCount] = useState()
    const [technicalRequirements, setTechnicalRequirements] = useState()
    const [specialRequirements, setSpecialRequirements] = useState()
    const [projectStatus, setProjectStatus] = useState()
    const [professionLevel, setProfessionLevel] = useState()
    const [degree, setDegree] = useState()
    const [projectLevel, setProjectLevel] = useState()
    const [interviewType, setInterviewType] = useState()
    const [feedbackTimeRange, setFeedbackTimeRange] = useState()
    const [tags, setTags] = useState()
    const [adminNote, setAdminNote] = useState()
    const [applicationDeadline, setApplicationDeadline] = useState()
    const [expectedCompletionDate, setExpectedCompletionDate] = useState()
    const [startDate, setStartDate] = useState()
    const [newFile, setNewFile] = useState(null);

    useEffect(() => {
        setApplicationDeadline(editProject.application_deadline.split('-').reverse().join('/'))
        setExpectedCompletionDate(editProject.expected_completion_date.split('-').reverse().join('/'))
        setStartDate(editProject.start_date.split('-').reverse().join('/'))
    }, []);
    const handleClose = () => setShow(false);

    const handleSubmitButton = (event) => {
        event.preventDefault();

        const projectImage = event.target.elements.projectImage.value;
        const projectName = event.target.elements.projectName.value;
        const projectSummary = event.target.elements.projectSummary.value;
        const projectDescription = event.target.elements.projectDescription.value;
        const projectAim = event.target.elements.projectAim.value;
        const maxParticipantCount = event.target.elements.maxParticipantCount.value;
        const technicalRequirements = event.target.elements.technicalRequirements.value;
        const specialRequirements = event.target.elements.specialRequirements.value;
        const projectAccessType = event.target.elements.projectAccessType.value;
        const professionLevel = event.target.elements.professionLevel.value;
        const degree = event.target.elements.degree.value;
        const projectLevel = event.target.elements.projectLevel.value;
        const interviewType = event.target.elements.interviewType.value;
        const feedbackTimeRange = event.target.elements.feedbackTimeRange.value;
        const tags = event.target.elements.tags.value.split(",");
        const adminNote = event.target.elements.adminNote.value;

        // 2. Handle date formatting
        const applicationDeadlineFormatted = event.target.elements.applicationDeadline.value.split("/").reverse().join("-");
        const expectedCompletionDateFormatted = event.target.elements.expectedCompletionDate.value.split("/").reverse().join("-");
        const startDateFormatted = event.target.elements.startDate.value.split("/").reverse().join("-");

        // 3. Create the ProjectUpdateDTO object
        const updateDTO = new ProjectUpdateDTO(
            getUserID(),
            editProject.project_id,
            projectImage,
            projectName,
            projectSummary,
            projectDescription,
            projectAim,
            applicationDeadlineFormatted,
            expectedCompletionDateFormatted,
            maxParticipantCount,
            technicalRequirements,
            specialRequirements,
            projectAccessType,
            professionLevel,
            degree,
            projectLevel,
            adminNote,
            interviewType,
            feedbackTimeRange,
            startDateFormatted,
            tags
        );
        console.log("ASDFAS: ", updateDTO)
        handleClose(); // Close the modal
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) { // Sadece resim dosyalarını işle
            const reader = new FileReader();

            reader.onload = () => {
                const base64Data = reader.result.split(',')[1]; // Base64 veriyi al

                // Veriyi Blob'a çevir
                const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], {type: file.type});

                const newFileName = `${getUserID()},${editProject.project_id}.png`;

                // Yeni bir File nesnesi oluştur
                const newFile = new File([blob], newFileName, {type: file.type});

                // Dosyayı belirlediğiniz yola kaydetmek için FileSaver.saveAs kullanın

                FileSaver.saveAs(newFile, `/projects/${newFileName}`);
            };

            reader.readAsDataURL(file);
        } else {
            console.error('Geçersiz dosya türü. Lütfen bir resim dosyası yükleyin.');
        }
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
                        <Row style={{
                            justifyContent: "center",
                            alignItems: "center",
                            /*borderStyle: "solid",*/
                            width: "auto",
                        }}>
                            <img src={require(`../components/projects/${editProject.project_image_path}`)} style={{
                                borderStyle: "solid",
                                width: "300px",
                                height: "200px"
                            }}/>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="formProjectImage">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Project Image
                                        URL</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="projectImage"
                                        placeholder="Project Image URL"
                                        onChange={handleFileChange}
                                        /*defaultValue={editProject.project_image_path}*/

                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup controlId="formProjectName">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Project Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="projectName"
                                        placeholder="Project Name"
                                        defaultValue={editProject.project_title}
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
                                    defaultValue={editProject.project_description}

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
                                        defaultValue={editProject.project_summary}

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
                                        defaultValue={editProject.project_aim}
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
                                        defaultValue={editProject.application_deadline.split('/').reverse().join('-')}
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
                                        defaultValue={editProject.expected_completion_date.split('/').reverse().join('-')}

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
                                        defaultValue={editProject.max_participant}
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
                                        defaultValue={editProject.start_date.split('/').reverse().join('-')}

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
                                        defaultValue={editProject.technical_requirements}
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
                                        defaultValue={editProject.special_requirements}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="projectAccessType">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Project
                                        Status</Form.Label>
                                    <Form.Select defaultValue={editProject.project_status} aria-label="Access Type">
                                        <option disabled={true}>Project Status</option>
                                        <option value="NOT_STARTED">NOT_STARTED</option>
                                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                                        <option value="FINISHED">FINISHED</option>
                                        <option value="CANCELED">CANCELED</option>
                                        <option value="FAILED">FAILED</option>
                                        <option value="TIMEOUT">TIMEOUT</option>

                                    </Form.Select>
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup controlId="professionLevel">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Profession
                                        Level</Form.Label>
                                    <Form.Select defaultValue={editProject.project_profession_level}
                                                 aria-label="Access Type">
                                        <option disabled={true}>Profession Level</option>
                                        <option value="Entry_Level">Entry_Level</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Expert">Expert</option>

                                    </Form.Select>
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="degree">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Degree</Form.Label>
                                    <Form.Select defaultValue={editProject.project_degree} aria-label="Degree">
                                        <option disabled={true}>Recommended Degree</option>
                                        <option value="BACHELOR">BACHELOR</option>
                                        <option value="PHD">PHD</option>
                                        <option value="MASTER">MASTER</option>

                                    </Form.Select>
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup controlId="projectLevel">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Project
                                        Level</Form.Label>
                                    <Form.Select defaultValue={editProject.project_level} aria-label="Project Level">
                                        <option disabled={true}>Project Level</option>
                                        <option value="ENTRY_LEVEL">ENTRY_LEVEL</option>
                                        <option value="INTERMEDIATE">INTERMEDIATE</option>
                                        <option value="EXPERT">EXPERT</option>

                                    </Form.Select>
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row>
                            <Col md={6}>
                                <FormGroup controlId="interviewType">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Interview
                                        Type</Form.Label>
                                    <Form.Select defaultValue={editProject.interview_type} aria-label="Interview Type">
                                        <option disabled={true}>Interview Type</option>
                                        <option value="CODE">CODE</option>
                                        <option value="TEST">TEST</option>
                                        <option value="NO_INTERVIEW">NO_INTERVIEW</option>
                                    </Form.Select>
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup controlId="feedbackTimeRange">
                                    <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Feedback
                                        Range</Form.Label>
                                    <Form.Select defaultValue={editProject.feedback_time_range}
                                                 aria-label="Feedback Range">
                                        <option disabled={true}>Feedback Range</option>
                                        <option value="ONE_WEEK">ONE_WEEK</option>
                                        <option value="TWO_WEEKS">TWO_WEEKS</option>
                                        <option value="ONE_MONTH">ONE_MONTH</option>

                                    </Form.Select>
                                </FormGroup>
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
                                    defaultValue={editProject.project_tags.map((tag) => tag.tagName).join(",")}
                                />
                            </FormGroup>
                        </Col>

                        <Col md={12}>
                            <FormGroup controlId="adminNote">
                                <Form.Label style={{fontWeight: "700", marginTop: "10px"}}>Admin Note</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    style={{height: "100px"}}
                                    name="adminNote"
                                    defaultValue={editProject.admin_note}

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