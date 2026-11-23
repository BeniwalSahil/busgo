import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthPopup from "./components/Auth/AuthPopup.jsx";

import Navbar from "./components/Navbars/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Offers from "./pages/Order/Offers.jsx";
import Reward from "./pages/Reward/Rewards.jsx";
import Newupdate from "./pages/NewUpdate/Newupdate.jsx";
import CouponDetails from "./pages/Order/Coupon.jsx";
import BusListing from './pages/BusList/Buslist.jsx'
import SeatSelectingPlan from "./pages/SelectSeats/SelectSeats.jsx";
import PassengerDetails from "./components/PassengerDetail/PassengerDetails.jsx"
import Footer from './components/Footer/Footer.jsx';
import Payment from "./pages/Payment/Payment.jsx";
import BookingConfirmation from "./pages/BookingConfirmation/BookingConfirmation.jsx";
import Accounts from "./pages/Account/Accounts.jsx";


function App() {

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("busgoCurrentUser")) || null;
  });

  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState("login");

  const handleWebsiteClick = () => {

    if (currentUser) return;

    const users = JSON.parse(
      localStorage.getItem("busgoUsers") || "[]"
    );

    if (useState.length === 0) {
      setAuthTab("register");
    } else {
      setAuthTab("login");
    }
    setShowAuth(true);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowAuth(false);
  }
  const handleLogout = () => {
    localStorage.removeItem("busgoCurrentUser");
    setCurrentUser(null);
  }

  return (
    <BrowserRouter>

      <div onClickCapture={handleWebsiteClick}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/Coupon/:id" element={<CouponDetails />} />
          <Route path="/buslisting" element={<BusListing />} />
          <Route path="/SelectSeat" element={<SeatSelectingPlan />} />
          <Route path="/PassengerDetails" element={<PassengerDetails />} />
          <Route path="/BookingConfirmation" element={<BookingConfirmation />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/reward" element={<Reward />} />
          <Route path="/Accounts" element={<Accounts />} />
        </Routes>
        <button onClick={handleLogout} className="busgo-logout-btn">
          Logout
        </button>
        <Footer />
      </div>
      {showAuth && !currentUser && (
        <AuthPopup
          onLogin={handleLogin}
          initialTab={authTab}
        />
      )}

    </BrowserRouter>
  );
}

export default App;