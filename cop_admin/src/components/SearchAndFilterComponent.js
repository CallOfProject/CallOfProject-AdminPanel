import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, {useState} from "react";
import './SearchAndFilter.css'
import {useDispatch} from "react-redux";
import {userTableActions} from "../store";
import {findUsersWitKeyword} from "../service/UserService";

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
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll>

                        <NavDropdown title="Root User" id="navbarScrollingDropdown" disabled={true}>
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href="#">
                            Link
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