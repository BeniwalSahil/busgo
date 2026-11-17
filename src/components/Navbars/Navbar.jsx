import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { IoListSharp } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaBus } from "react-icons/fa";

const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(null);
    const [mobileMenu, setMobileMenu] = useState(false);

    const navbarRef = useRef(null);
    const navigate = useNavigate();

    // Toggle dropdown menus
    const handleMenu = (menu) => {
        setActiveMenu((prev) => prev === menu ? null : menu);
    };

    // Close menus when clicking outside
    useEffect(() => {

        const handleOutsideClick = (event) => {
            if (
                navbarRef.current &&
                !navbarRef.current.contains(event.target)
            ) {
                setActiveMenu(null);
                setMobileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };

    }, []);

    // Navigate and close dropdown
    const handleNavigation = (path) => {
        setActiveMenu(null);
        setMobileMenu(false);
        navigate(path);
    };

    return (
        <header className="navbar" ref={navbarRef}>

            <div className="navbar-container">

                {/* Logo Section */}
                <Link
                    to="/"
                    className="navbar-logo"
                    onClick={() => {
                        setActiveMenu(null);
                        setMobileMenu(false);
                    }}
                >
                    <h4> <FaBus /></h4>
                    <span><p>BUS</p></span>
                    <span>GO</span>
                </Link>

                {/* Navigation Section */}
                <nav className={`navbar-menu ${mobileMenu ? "show-menu" : ""}`}>

                    {/* Booking */}
                    <div className="nav-item">

                        <button
                            className={`nav-button ${activeMenu === "booking" ? "selected" : ""}`}
                            onClick={() => handleMenu("booking")}
                        >
                            <span><IoListSharp /> Booking</span>
                            {/* <span className="arrow">⌄</span> */}
                        </button>

                        {/* {activeMenu === "booking" && (
                            <div className="dropdown-menu">
                                <button onClick={() => handleNavigation("/my-bookings")}>
                                    My Bookings
                                </button>

                                <button onClick={() => handleNavigation("/cancel-ticket")}>
                                    Cancel Ticket
                                </button>

                                <button onClick={() => handleNavigation("/bus-listing")}>
                                    Search Buses
                                </button>
                            </div>
                        )} */}

                    </div>

                    {/* Help */}
                    <div className="nav-item">

                        <button
                            className={`nav-button ${activeMenu === "help" ? "selected" : ""}`}
                            onClick={() => handleMenu("help")}
                        >
                            <span><BsQuestionCircle /> Help</span>
                            {/* <span className="arrow">⌄</span> */}
                        </button>

                        {/* {activeMenu === "help" && (
                            <div className="dropdown-menu">
                                <button onClick={() => handleNavigation("/faq")}>
                                    FAQs
                                </button>

                                <button onClick={() => handleNavigation("/contact")}>
                                    Contact Us
                                </button>

                                <button onClick={() => handleNavigation("/support")}>
                                    Customer Support
                                </button>
                            </div>
                        )} */}

                    </div>

                    {/* Account */}
                    <div className="nav-item">

                        <button
                            className={`nav-button ${activeMenu === "account" ? "selected" : ""}`}
                            onClick={() => handleMenu("account")}
                        >
                            <span><FaRegCircleUser /> Account</span>
                            {/* <span className="arrow">⌄</span> */}
                        </button>

                        {/* {activeMenu === "account" && (
                            <div className="dropdown-menu account-dropdown">
                                <button onClick={() => handleNavigation("/login")}>
                                    Login
                                </button>

                                <button onClick={() => handleNavigation("/register")}>
                                    Create Account
                                </button>

                                <button onClick={() => handleNavigation("/profile")}>
                                    My Profile
                                </button>
                            </div>
                        )} */}

                    </div>

                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-toggle"
                    onClick={() => setMobileMenu((prev) => !prev)}
                    aria-label="Toggle navigation"
                    aria-expanded={mobileMenu}
                >
                    {mobileMenu ? "✕" : "☰"}
                </button>

            </div>

        </header>
    );
};

export default Navbar;
