import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbars/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Offers from "./pages/Order/Offers.jsx";
import Reward from "./pages/Reward/Rewards.jsx";
import Newupdate from "./pages/NewUpdate/Newupdate.jsx";
import Footer from './components/Footer/Footer.jsx';

function BusListing() {
  return <h1>Bus Listing Page.</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/bus-listing" element={<BusListing />} />
        <Route path="/reward" element={<Reward />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;