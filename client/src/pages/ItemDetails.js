import React, { useContext, useState } from "react";

import "./ItemDetails.css";
import { Button, Form, Modal } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";

const ItemDetails = ({ singleItem }) => {

  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false); 
const handleShow = () => setShow(true); 
  // const productQuantity = cart.getProductQuantity(singleItem.productId);

  console.log(cart.items);
const navigate = useNavigate();
  return (
    <>
    {singleItem ? 
    <div className="main-item-details-container">
      <img className="item-details-image" src={singleItem.img} alt="gift-card"></img>
      <div className="item-details">
        <h1>{singleItem.productName}</h1>
        <hr className="hr1" />
        <Form onSubmit={(event) => {
          cart.addToCart(event, singleItem.productId, singleItem.productName, singleItem.img, singleItem.senderFee);
          {handleShow()};
          }}>
        <div className="group-denomination-and-quantity">
          {singleItem.denominationType === "FIXED" ? (
            <div>
              <label className="denominations" for="denominations">
                Denominations:&nbsp;&nbsp;
              </label>
              <select
                onChange={cart.denominationChangeHandler}
                name="denominations"
                id="denominations"
                className="denomination-input"
                required
              >
                <option value=""> </option>
                {singleItem.fixedRecipientDenominations.map((value) => (
                  <option value={value}>${value.toFixed(2)}</option>
                ))}
                
              </select>
            </div>
          ) : null}

          {singleItem.denominationType === "RANGE" ? (
            <div>
              <p>
                Please enter denomination &#40;from $
                {singleItem.minSenderDenomination} to $
                {singleItem.maxSenderDenomination}&#41;:&nbsp;
                <input
                  className="denomination-input"
                  type="number"
                  required
                  min={parseInt(singleItem.minSenderDenomination).toFixed(2)}
                  max={parseInt(singleItem.maxSenderDenomination).toFixed(2)}
                  onChange={cart.denominationChangeHandler}
                ></input>
              </p>
            </div>
          ) : null}
          <p>
                  Quantity &#40;1-20&#41;:&nbsp;
                  <input
                    className="quantity-input"
                    type="number"
                    min="1"
                    max="20"
                    onChange={cart.quantityChangeHandler}
                    required
                  ></input>
                </p>
                <p>Sender Fee (${singleItem.senderFee.toFixed(2)}/per 1 item): ${(singleItem.senderFee * cart.qty).toFixed(2)}</p>
        </div>

        <Button
          variant="warning"
          type="submit" 
          value="denomination-input"
        >
          Add to cart
        </Button>
        </Form>
        <Modal className="modal" show={show} onHide={handleClose} closeButton>
        <Modal.Header className="modal-content-styling" closeButton>
        <Modal.Title>Added to cart</Modal.Title>
        </Modal.Header>
    </Modal>
        <hr className="hr1" />
        <div>{singleItem.description}</div>
      </div>
    </div> 
  : navigate("/")}
  </>
  );
};

export default ItemDetails;
