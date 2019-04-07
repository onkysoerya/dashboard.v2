import React, { Component } from 'react';
import { Button, Nav, Navbar, Form } from 'react-bootstrap';

export default class Navbara extends Component {
  render() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="#/">Home</Nav.Link>
                <Nav.Link href="#tambahberita">Tambah Berita</Nav.Link>
                </Nav>
                <Form inline>
                    <Button variant="danger">Logout</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
  }
}
