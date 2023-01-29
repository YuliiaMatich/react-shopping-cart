import axios from "axios";
import { useState, useEffect } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cancel from './pages/Cancel';
import Success from './pages/Success';
import Store from './pages/Store';

const api = axios.create({
  baseURL:
    "https://api.chimoney.io/v0.2/info/assets",
});



function App() {

const [storeItems, setStoreItems] = useState(null);


  useEffect(() => {
    api.get("/").then((response) => setStoreItems(response.data.data.giftCardsRLD.content));
  }, []);


  return (
    <Container>
      <NavbarComponent></NavbarComponent>
      <BrowserRouter>
      {!storeItems ? "Loading..." :
        <Routes>
          <Route index element={<Store itemsList={storeItems}/>} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
        </Routes>}
      </BrowserRouter>
    </Container>
  );
}

export default App;
