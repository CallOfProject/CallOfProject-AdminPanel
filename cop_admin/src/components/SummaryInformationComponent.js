import {Card, Row} from "react-bootstrap";

const SummaryInformationComponent = () =>
{
    return(
        <Row style={{marginBottom: "80px"}}>
            <Card
                bg="success"
                key="success"
                text="white"
                className="cop-card mb-2"
            >
                <Card.Header className="card-header">User Count</Card.Header>
                <Card.Body>
                    <Card.Text>Total user count: 33</Card.Text>
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
                    <Card.Text>Total user count: 33</Card.Text>
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
                        Opened ticket count: 12
                        <br />
                        Unopened ticket count: 12
                    </Card.Text>
                </Card.Body>
            </Card>
        </Row>
    );
}

export default SummaryInformationComponent;