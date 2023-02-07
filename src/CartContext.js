import React, { createContext, useState, useEffect } from "react";


export const CartContext = createContext({
  items: [],
  addToCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  denominationChangeHandler: () => {},
  quantityChangeHandler: () => {},
  showAlert: () => {}
});

// Context (csrt, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context

export function CartProvider({ children, productsArray }) {
  const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [denomination, setDenomination] = useState("");
  const [enteredQuantity, setEnteredQuantity] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    }, [cartProducts])

  const denominationChangeHandler = (event) => {
    setDenomination(event.target.value);
  };

  const quantityChangeHandler = (event) => {
    setEnteredQuantity(event.target.value);
  };

  function getProductQuantity(id, denom) {
    return cartProducts.find(
      (product) => product.id === id && product.giftCardDenomination === denom
    );
  }

  function addToCart(event, id) {
    event.preventDefault();

    const productAlreadyInCart = getProductQuantity(id, denomination);

    if (!productAlreadyInCart) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          giftCardDenomination: denomination,
          quantity: enteredQuantity,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.id === id && product.giftCardDenomination === denomination // if condition
              ? {
                  ...product,
                  quantity:
                    parseInt(product.quantity) + parseInt(enteredQuantity),
                } // if statement is true
              : product // if statement is false
        )
      );
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
    quantityChangeHandler
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
