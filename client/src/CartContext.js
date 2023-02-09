import React, { createContext, useState, useEffect } from "react";



export const CartContext = createContext({
  qty: "",
  items: [],
  addToCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  denominationChangeHandler: () => {},
  quantityChangeHandler: () => {}
});

// Context (csrt, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context

export function CartProvider({ children, productsArray }) {
  
  const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [denomination, setDenomination] = useState("");
  const [enteredQuantity, setEnteredQuantity] = useState("");
  // const navigate = useNavigate();
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

  function addToCart(event, id, productName, img, fee) {
    event.preventDefault();

    const productAlreadyInCart = getProductQuantity(id, denomination);

    if (!productAlreadyInCart) {
      setCartProducts([
        ...cartProducts,
        {
          id,
          productName,
          img,
          giftCardDenomination: denomination,
          quantity: enteredQuantity,
          fee,
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

  function deleteFromCart(id, denomination) {
    let cartContents = JSON.parse(localStorage.getItem("cart"));
    let newCartContents = cartContents.filter(currentProduct => currentProduct.id !== id || currentProduct.giftCardDenomination !== denomination);
    setCartProducts(newCartContents);
    //localStorage.setItem("cart", JSON.stringify(newCartContents));
    
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
  let totalCost = cartProducts.reduce((total, item) => {return total + (item.giftCardDenomination * item.quantity + (item.quantity * item.fee))}, 0);
  console.log(totalCost)
  return totalCost;
  }

  const contextValue = {
    qty: enteredQuantity,
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
