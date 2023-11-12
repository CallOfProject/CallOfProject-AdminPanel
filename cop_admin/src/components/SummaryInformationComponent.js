import {Card, Row} from "react-bootstrap";
import './AdminPage.css'
const SummaryInformationComponent = () =>
{
    return(
        <Row className="summary-info-row">
            <Card
                bg="success"
                key="success"
                text="white"
                className="cop-card mb-2"
            >
                <Card.Header className="card-header">User Count</Card.Header>
                <Card.Body>
                    <Card.Text><strong>Total user count:</strong> 33</Card.Text>
                </Card.Body>
            </Card>

            <Card
                bg="primary"
                key="primary"
                text="light"
                className="cop-card mb-2"
            >
                <Card.Header className="card-header">User Count</Card.Header>
                <Card.Body>
                    <Card.Text><strong>Total user count:</strong> 33</Card.Text>
                </Card.Body>
            </Card>

            <Card
                bg="danger"
                key="danger"
                text="white"
                className="cop-card mb-2"
            >
                <Card.Header className="card-header">Ticket Information</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <strong>Opened ticket count:</strong> 12
                        <br />
                        <strong>Unopened ticket count:</strong> 12
                    </Card.Text>
                </Card.Body>
            </Card>
        </Row>
    );
}

export default SummaryInformationComponent;