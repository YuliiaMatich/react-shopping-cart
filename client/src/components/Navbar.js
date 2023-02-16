import React, { useState, useContext } from "react";
import { Button, Navbar, Modal } from "react-bootstrap";
import "./Navbar.css";
import { CartContext } from "../CartContext";
import Cart from "./Cart";

const NavbarComponent = () => {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const productsCount = cart.items.reduce(
    (sum, product) => sum + parseInt(product.quantity),
    0
  );

  return (
    <React.Fragment>
      <Navbar expand="sm" sticky="top" className="navbar">
        <Navbar.Brand href="/" className="storeName">
          GiftCards Store
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
        <Button variant="outline-light" onClick={handleShow}>
          Cart ({productsCount} Items)
        </Button>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Cart show={show} setShow={setShow}></Cart>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default NavbarComponent;
