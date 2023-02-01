import React, { useContext } from "react";

import "./ItemDetails.css";
import { Button, Form, Col, Row } from "react-bootstrap";
import { CartContext } from "../CartContext";

const ItemDetails = ({ singleItem }) => {

  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(singleItem.productId);

  console.log(cart.items);

  return (
    <div className="main-item-details-container">
      <img className="item-details-image" src={singleItem.img}></img>
      <div className="item-details">
        <h1>{singleItem.productName}</h1>
        <hr className="hr1" />
        <div className="group-denomination-and-quantity">
          {singleItem.denominationType === "FIXED" ? (
            <div>
              <label className="denominations" for="denominations">
                Denominations:&nbsp;&nbsp;
              </label>
              <select name="denominations" id="denominations">
                {singleItem.fixedRecipientDenominations.map((value) => (
                  <option value={value}>{value}</option>
                ))}{" "}
              </select>
            </div>
          ) : null}

          {singleItem.denominationType === "RANGE" ? (
            <div>
              <p>
                Please enter denomination &#40;from $
                {singleItem.minSenderDenomination} to $
                {singleItem.maxSenderDenomination}&#41;:&nbsp;{" "}
                <input
                  className="quantity-input"
                  type="number"
                  min={singleItem.minSenderDenomination}
                  max={singleItem.maxSenderDenomination}
                  required
                ></input>
              </p>
            </div>
          ) : null}
        </div>

        {productQuantity > 0 ? (
          <>
          <Form as={Row}>
            <Form.Label column="true" sm="6"> In Cart: {productQuantity} </Form.Label>
            <Col>
            <Button variant="warning" sm="6" className="mx-2" onClick={() => cart.addOneToCart(singleItem.productId)}>+</Button>
            <Button variant="warning" sm="6" className="mx-2" onClick={() => cart.removeOneFromCart((singleItem.productId))}>-</Button>
            </Col> 
          </Form>
          <Button variant="danger" className="my-2" onClick={()=>cart.deleteFromCart(singleItem.productId)}>Remove from Cart</Button>
          </>
        ) : (
          <Button
            variant="warning"
            onClick={() => cart.addOneToCart(singleItem.productId)}
          >
            Add to cart
          </Button>
        )}

        <hr className="hr1" />
        <div>{singleItem.description}</div>
      </div>
    </div>
  );
};

export default ItemDetails;

// {props.itemsList.map((singleItem) => (
//   <ItemContainer
//     key={singleItem.productId}
//     id={singleItem.productId}
//     productName={singleItem.productName}
//     image={singleItem.logoUrls[0]}
//     description={singleItem.description}
//     denominationType={singleItem.denominationType}
//     minRecipientDenomination={singleItem.minRecipientDenomination}
//     maxRecipientDenomination={singleItem.maxRecipientDenomination}
//     fixedSenderDenominations={singleItem.fixedSenderDenominations}
//     onClick={(event) => handleClick(event, singleItem)}
//   ></ItemContainer>
