import axios from "axios";
import React, { useState, useEffect } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import Store from './pages/Store';
import ItemDetails from "./pages/ItemDetails";
import CartProvider from "./CartContext";

const api = axios.create({
  baseURL:
    "https://api.chimoney.io/v0.2/info/assets",
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
      <NavbarComponent></NavbarComponent>
      <BrowserRouter>
      {!storeItems ? "Loading..." :
        <Routes>
          <Route index element={<Store itemsList={storeItems} setSingleItem={setSingleItem}/>} />
          <Route path="/products/:id" element={<ItemDetails id={id} singleItem={singleItem}/> } />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
        </Routes>}
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
