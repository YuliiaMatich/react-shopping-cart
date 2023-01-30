import React, { useState } from "react";
import { Button, Navbar, Modal } from "react-bootstrap";
import "./Navbar.css";

const NavbarComponent = (props) => {
const [show, setShow] =useState(false);
const handleClose = () => setShow(false); 
const handleShow = () => setShow(true); 

  return (
    <React.Fragment>
    <Navbar expand="sm" sticky="top" className="navbar">
      <Navbar.Brand href="/" className="storeName">GiftCards Store</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
      <Button variant="outline-light" 
      onClick={handleShow}>Cart 0 Items</Button>
    </Navbar>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>This is the  modal body</h1>
      </Modal.Body>
    </Modal>
    </React.Fragment>
  );
};

export default NavbarComponent;
