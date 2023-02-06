import React, { useContext } from "react";

import "./ItemDetails.css";
import { Button, Form } from "react-bootstrap";
import { CartContext } from "../CartContext";

const ItemDetails = ({ singleItem }) => {

  const cart = useContext(CartContext);
  // const productQuantity = cart.getProductQuantity(singleItem.productId);

  console.log(cart.items);

  return (
    <div className="main-item-details-container">
      <img className="item-details-image" src={singleItem.img} alt="gift-card"></img>
      <div className="item-details">
        <h1>{singleItem.productName}</h1>
        <hr className="hr1" />
        <Form onSubmit={(event) => cart.addToCart(event, singleItem.productId)}>
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
              >
                <option value="-"> </option>
                {singleItem.fixedRecipientDenominations.map((value) => (
                  <option value={value}>{value}</option>
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
                  min={singleItem.minSenderDenomination}
                  max={singleItem.maxSenderDenomination}
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
        </div>

        <Button
          variant="warning"
          type="submit" 
          value="denomination-input"
        >
          Add to cart
        </Button>
        </Form>
        <hr className="hr1" />
        <div>{singleItem.description}</div>
      </div>
    </div>
  );
};

export default ItemDetails;
