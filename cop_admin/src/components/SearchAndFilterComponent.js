import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, {useState} from "react";
import './SearchAndFilter.css'
import {useDispatch} from "react-redux";
import {userTableActions} from "../store";
import {findUsersWitKeyword} from "../service/UserService";
import {Badge} from "react-bootstrap";

const addAll = ({dispatch}, users) => dispatch(userTableActions.addAll(users))
const SearchAndFilterComponent = ({title}) => {

    const [word, setWord] = useState("")
    const dispatch = useDispatch()
    const handleSearchButton = async () => {
        await fetchData(1, word)

    };

    const fetchData = async (page, word) => {
        try {
            const newUsers = await findUsersWitKeyword(page, word);
            addAll({dispatch}, newUsers)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const SearchField = (event) => {
        setWord(event.target.value)
    };
    return (
        <Navbar expand="lg" style={{backgroundColor: "rgb(154, 179, 182)", color: "black"}}>
            <Container fluid>
                <Navbar.Brand style={{fontWeight: "700", fontSize: "16pt"}} href="#">{title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav/>

                    <Nav className="me-auto my-2 my-lg-0" style={{
                        maxHeight: '100px', borderStyle: "solid", borderRadius: "50px"
                    }} navbarScroll>
                        <Nav.Link style={{fontSize: "13pt", fontWeight: "550", color: "black"}}>
                            Notifications
                            <Badge bg="danger" pill style={{marginLeft: '5px'}}>14</Badge>
                        </Nav.Link>
                    </Nav>

                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={SearchField}
                        />
                        <Button variant="success" onClick={handleSearchButton}>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default SearchAndFilterComponent;