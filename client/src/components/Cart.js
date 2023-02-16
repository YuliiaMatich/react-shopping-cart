import "./Cart.css";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";


const Cart = ({setShow}) => {

  const cart = useContext(CartContext);
  const navigate = useNavigate();
    
  
    const totalAmt = "$" + cart.getTotalCost().toFixed(2);
    const productsCount = cart.items.reduce(
      (sum, product) => sum + parseInt(product.quantity),
      0
    );
  
    let selectQty = () => {
      let result = [];
      for (let i = 1; i <=20; i++) {
        result.push(i);
      }
      return result;
    }

  const handleClick = (event) => {
    event.preventDefault();
    navigate('/payment');
    setShow(false);
  }

  return (
    <>
    {productsCount > 0 ? (
    <>
      <p>Items in your cart:</p>
      {cart.items.map((itm) => (
        <>
          <div className="shopping-cart">
            <div className="group-img-and-name">
              <img className="cart-image" src={itm.img} alt="gift-card"></img>
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
                  <p> <span className="qty"> Qty: </span>
                  <select
        onChange={(event) => cart.cartQuantityChangeHandler(event, itm)}
        name="quantity"
        id="quantity"
        required
      >
        {selectQty().map(number => (number === Number(itm.quantity) ? <option value={itm.quantity} selected>{itm.quantity}</option>  :  <option value={number}>{number}</option>))}
      </select> 
                    </p>
                  <Button
                    variant="link"
                    className="remove-button"
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
  )}</>
  )
}

export default Cart;