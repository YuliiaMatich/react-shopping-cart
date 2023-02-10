import React, { useState, useContext } from "react";
import { Button, Navbar, Modal } from "react-bootstrap";
import "./Navbar.css";
import CartProvider, { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom"; 

const NavbarComponent = (props) => {
  const cart = useContext(CartContext);
const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalAmt = "$" + cart.getTotalCost().toFixed(2);
  const productsCount = cart.items.reduce(
    (sum, product) => sum + parseInt(product.quantity),
    0
  );


  

  const handleClick = (event) => {
    event.preventDefault();
    navigate('/payment');
    setShow(false);
  }

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
                        <p className="product-name">
                          {itm.productName.length > 20
                            ? itm.productName.slice(0, 20) + "..."
                            : itm.productName}
                        </p>
                        <p className="denomination">
                          Denomination: $
                          {Number(itm.giftCardDenomination).toFixed(2)}
                        </p>
                        <p className="sender-fee">Sender Fee: ${(Number(itm.fee) * Number(itm.quantity)).toFixed(2)}</p>
                        <div className="group-qty-and-remove">
                          <p>Qty: {itm.quantity} </p>
                          <Button
                            variant="link"
                            onClick={() =>
                              cart.deleteFromCart(
                                itm.id,
                                itm.giftCardDenomination
                              )
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="group-price">
                      <p className="price">Price:</p>
                      <p className="price">
                        ${(itm.giftCardDenomination * itm.quantity + (itm.fee * itm.quantity)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <hr className="hr-cart" />
                </>
              ))}
              <div className="group-total-amount-and-checkout">
                <p className="total-amount">Total amount: {totalAmt}</p>
                <Button  onClick={(event) => handleClick(event)}>Proceed to checkout</Button>
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
