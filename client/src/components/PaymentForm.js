import React, { useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { CartContext } from "../CartContext";
import "./PaymentForm.css";
import successImg from "../images/success.png";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const PaymentForm = () => {
  const cart = useContext(CartContext);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const totalAmount = (cart.getTotalCost().toFixed(2)) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: totalAmount,
          id,
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
          cart.clearCart();
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <div className="form-container">
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button className="pay">Pay</button>
        </form>
        </div>
      ) : (
        <div className="successful-purchase">
          <img className="payment-image" src={successImg} alt=""/>
          <h3>The purchase was sussessfull! </h3>
          <a href="http://localhost:3000/">Go back to main page.</a>
        </div>
      )}
    </>
  );
};

export default PaymentForm;
