import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import logo from './images/logo-3.png';

export default class Header extends Component{
    render(){
        return(
            <Navbar bg="light" variant="light" color="#5D29A6">
                <Form inline>
                <Navbar.Brand href="#home">Un ejemplito ahí pa ve</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#casa">k-sita</Nav.Link>
                        <Nav.Link href="#perreo">Perreo</Nav.Link>
                        <Nav.Link href="#uribe">Paraclinico</Nav.Link>
                    </Nav> 
                </Form>
                <Form inline>
                    <img src={logo} width="100px" />
                </Form>
            </Navbar>
        );
    }
}
