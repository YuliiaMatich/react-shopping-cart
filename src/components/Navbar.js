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
              {cart.items.map((itm) => (
                <>
                  <div className="shopping-cart">
                    <div className="group-img-and-name">
                      <img className="cart-image" src={itm.img}></img>
                      <div className="group-name-denom-qty">
                          <p className="product-name">{itm.productName.length > 20 ? itm.productName.slice(0, 20) + "..." : itm.productName}</p> 
                          <p>Denomination: ${itm.giftCardDenomination}</p>
                          <div className="group-qty-and-remove">
                          <p>Qty: {itm.quantity} </p>
                          <Button variant="link" onClick={() => cart.deleteFromCart(itm.id, itm.giftCardDenomination)}>Remove</Button>
                          </div>
                          </div>
                         
                          </div>
            
                          <p className="price">Price: ${itm.giftCardDenomination * itm.quantity}</p>
                         
                          
                  </div>
                  <hr className="hr-cart"/>
                 
                </>
              ))}  
              <div className="group-total-amount-and-checkout">
              <p className="total-amount">Total amount:</p>
              <Button>Proceed to checkout</Button>
              </div>
            </>
          ) : (
            <h1>There are no items in your cart!</h1>
          )}
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default NavbarComponent;
