import React, { useState, useContext } from "react";
import { Button, Navbar, Modal } from "react-bootstrap";
import "./Navbar.css";
import CartProvider, { CartContext } from "../CartContext";

const NavbarComponent = (props) => {
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
          {productsCount > 0 ? (
            <>
              <p>Items in your cart:</p>
              {cart.items.map((currentProduct, idx) => {
                <h1>{currentProduct.title}</h1>;
              })}
            </>
          ) : (
            <h1>There are no items in the shopping cart!</h1>
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default NavbarComponent;
