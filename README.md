# GiftCards Store

Fullstack application that is using external API to get gift cards information and Stripe as a payment service.
Built using React JS, Express and Bootstrap.

User can:
- browse the list of available gift cards;
- visit a gift card single page;
- on a single page user can enter a gift card denomination and choose a quantity of gift cards user would like to purchase. Gift card denominations may be either a range (for example 5$-100$) or fixed denominations (for example: $5, $10, $25, etc.) There is a sender fee $0.50 per card. A sender fee will be dynamically changed when user changes gift cards quanity.
- once user entered gift cards denomination, quantity and clicked "Add to cart" button - Cart will appear as a pop up. Number of added items will be changed at "Cart (...items)" button, located at the top-right at the Navbar.
- user can go to main page and continue browsing. The information of the added to cart items will be persisted using browser localStorage.
- user can click on "Cart (... items)" button at top-right at Navbar - cart will appear as a pop up with the list of added items. 
- user can remove items with the same denomination from cart at one click. Total amount of items which remained in cart will be adjusted accordingly. If no items left in the cart a message "There are no items in your cart"  will appear.
- user can proceed to checkout if there are any items in the cart. User will be redirected to a Stripe payment page. If payment is successfull, user will see a confirmation page.

## Setup

Install dependencies with `npm install` in both server and client folders.


## Running Backend from server folder
```sh
node index.js
```

Note: in order to test stripe payment page, please use your stripe credentials. .env.example files are attached.

## Running Frontend from client folder

```sh
npm start
```

## Screenshots

!["Main page"](https://github.com/YuliiaMatich/react-shopping-cart/blob/main/images/main-page.png)
!["Single item page"](https://github.com/YuliiaMatich/react-shopping-cart/blob/main/images/single-item.png)
!["Added to cart"](https://github.com/YuliiaMatich/react-shopping-cart/blob/main/images/added-to-cart.png)
!["Cart"](https://github.com/YuliiaMatich/react-shopping-cart/blob/main/images/cart.png)
!["Payment page"](https://github.com/YuliiaMatich/react-shopping-cart/blob/main/images/stripe-payment-page.png)
!["Payment confirmation"](https://github.com/YuliiaMatich/react-shopping-cart/blob/main/images/payment-confirmation.png)

## Dependencies (Frontend)
 "dependencies": {
    "@stripe/react-stripe-js": "^1.16.4",
    "@stripe/stripe-js": "^1.46.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.3.2",
    "bootstrap": "^5.2.3",
    "react": "^18.2.0",
    "react-bootstrap": "^2.7.0",
    "react-dom": "^18.2.0",
    "react-local-toast": "^1.1.4",
    "react-router-dom": "^6.8.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  }


## Dependencies (Backend)
"dependencies": {
    "body-parser": "^1.20.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "stripe": "^11.9.1"
  }
