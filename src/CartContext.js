import React, { createContext, useState } from "react";
import 'react-local-toast/dist/bundle.css';
import { LocalToastProvider } from 'react-local-toast';
import Alert from 'react-bootstrap/Alert';

export const CartContext = createContext({
  items: [],
  addToCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  denominationChangeHandler: () => {},
  quantityChangeHandler: () => {},
});

// Context (csrt, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context

export function CartProvider({ children, productsArray }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [denomination, setDenomination] = useState("");
  const [enteredQuantity, setEnteredQuantity] = useState("");

  const denominationChangeHandler = (event) => {
    setDenomination(event.target.value);
  };

  const quantityChangeHandler = (event) => {
    setEnteredQuantity(event.target.value);
  };

  function addToCart(event, id) {
    event.preventDefault();
 
    if (denomination && enteredQuantity) {
   setCartProducts(
    [
      ...cartProducts,
      {
        id: id,
        giftCardDenomination: denomination,
        quantity: enteredQuantity,
      },
    ]);
    } 
    document.getElementsByClassName("quantity-input")[0].value = "";
    document.getElementsByClassName("denomination-input")[0].value = "";
    setDenomination(null);
    setEnteredQuantity(null);
  }

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id !== id;
      })
    );
  }

  function getProductData(id) {
    let productData = productsArray.find((product) => product.id === id);

    if (productData === undefined) {
      console.log("Product data does not exist for ID: " + id);
      return undefined;
    }

    return productData;
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id, denomination);
      totalCost += Number(denomination) * cartItem.quantity;
    });

    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    addToCart,
    deleteFromCart,
    getTotalCost,
    denominationChangeHandler,
    quantityChangeHandler,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
