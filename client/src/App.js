import axios from "axios";
import React, { useState, useEffect } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Store from './pages/Store';
import ItemDetails from "./pages/ItemDetails";
import CartProvider from "./CartContext";
import StripeContainer from "./components/StripeContainer";

const api = axios.create({
  baseURL:
    "https://025459c9-95ac-4acd-a02a-83b3d26bd1a1.mock.pstmn.io/goods",
});



function App() {

const [storeItems, setStoreItems] = useState(null);
const [singleItem, setSingleItem] = useState(null);

const {id} = useParams();

  useEffect(() => {
    api.get("/").then((response) => setStoreItems(response.data.data.giftCardsRLD.content));
  }, []);


  return (
    <CartProvider productsArray={storeItems} >
      <BrowserRouter>
      <NavbarComponent></NavbarComponent>
      {!storeItems ? "Loading..." :
        <Routes>
          <Route index element={<Store itemsList={storeItems} setSingleItem={setSingleItem}/>} />
          <Route path="/products/:id" element={<ItemDetails id={id} singleItem={singleItem}/> } />
          <Route path="payment" element={<StripeContainer/>} />
        </Routes>}
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
