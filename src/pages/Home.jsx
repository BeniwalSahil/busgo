
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { FaBus } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import Offers from "./Order/Offers";
import Reward from "./Reward/Rewards";
import GovernmentBuses from "./GovernmentBuses/GovernmentBuses";
import Newupdate from "./NewUpdate/Newupdate";
import Testimonial from './Testimonial/Testimonial'
import FAQ from "./Faq/Faq";
import PopularLinks from './PopularRouteCitiesBusOperator/PopRouteCitiesBusOperator'



const Home = () => {

    // State management
    const [fromCity, setFromCity] = useState("");
    const [toCity, setToCity] = useState("");
    const [journeyDate, setJourneyDate] = useState("2026-11-20");

    // Current local date
    const now = new Date();
    const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0")
    ].join("-");

    const navigate = useNavigate();

    // Swap source and destination
    const handleSwap = () => {
        setFromCity(toCity);
        setToCity(fromCity);
    };

    // Search buses
    const handleSearch = (e) => {
        e.preventDefault();

        const from = fromCity.trim();
        const to = toCity.trim();

        if (!from || !to) {
            alert("Please enter both source and destination cities.");
            return;
        }

        if (from.toLowerCase() === to.toLowerCase()) {
            alert("Source and destination cannot be the same.");
            return;
        }

        if (!journeyDate) {
            alert("Please select journey date.");
            return;
        }

        if (journeyDate < today) {
            alert("Please select a valid journey date.");
            return;
        }

        navigate(
            `/Buslisting?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${journeyDate}`
        );
    };

    // Popular routes
    const popularRoutes = [
        { from: "Delhi", to: "Jaipur" },
        { from: "Delhi", to: "Agra" },
        { from: "Delhi", to: "Chandigarh" },
        { from: "Mumbai", to: "Pune" }
    ];

    const selectRoute = (from, to) => {
        setFromCity(from);
        setToCity(to);
    };


    return (
        <main className="home-page">

            {/* Hero Section */}
            <section className="hero-section">

                <div className="hero-content">

                    <span className="hero-tagline">
                        YOUR JOURNEY STARTS HERE
                    </span>

                    <h1>
                        Travel More.
                        <span> Worry Less.</span>
                    </h1>

                    <p>
                        Book your bus tickets easily and enjoy a comfortable
                        journey with BUSGO.
                    </p>

                    {/* Search Form */}
                    <form className="search-form" onSubmit={handleSearch}>

                        <div className="form-field">
                            <label htmlFor="fromCity">FROM</label>

                            <input
                                id="fromCity"
                                type="text"
                                placeholder="Enter source city"
                                value={fromCity}
                                onChange={(e) => setFromCity(e.target.value)}
                            />
                        </div>

                        {/* Swap Button */}
                        <button
                            type="button"
                            className="swap-button"
                            onClick={handleSwap}
                            aria-label="Swap cities"
                            title="Swap cities"
                        >
                            ⇄
                        </button>

                        <div className="form-field">
                            <label htmlFor="toCity">TO</label>

                            <input
                                id="toCity"
                                type="text"
                                placeholder="Enter destination city"
                                value={toCity}
                                onChange={(e) => setToCity(e.target.value)}
                            />
                        </div>

                        <div className="form-field date-field">
                            <label htmlFor="journeyDate">JOURNEY DATE</label>

                            <input
                                id="journeyDate"
                                type="date"
                                min={today}
                                value={journeyDate}
                                onChange={(e) => setJourneyDate(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="search-button">
                            Search Buses
                        </button>

                    </form>

                </div>

            </section>

            {/* offer section */}

            <section className="popular-section">
                <Offers />
            </section>


            {/* Reward Section */}

            <section className="popular-section">
                <Reward />
            </section>

            {/* goverment bus */}

            <section className="popular-section">
                <GovernmentBuses />
            </section>

            {/* whats new section */}

            <section className="popular-section">
                <Newupdate />
            </section>

            {/* Testimonial */}

            <section className="popular-section">
                <Testimonial />
            </section>

            {/* faq section */}

            <section className="popular-section">
                <FAQ />
            </section>

            {/* route cities bus operator */}
            <section className="popular-section">
                <PopularLinks />
            </section>

        </main>
    );
};

export default Home;
