
import React, { useState, useRef } from "react";
import "./Offers.css";
import { MdOutlineLocalOffer } from "react-icons/md";

import { PiBusThin } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { CiBank } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";
import { IoTrainOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Offers = () => {

    const [activeTab, setActiveTab] = useState("All");
    const [showAll, setShowAll] = useState(false);
    const offersRef = useRef(null);

    const navigate = useNavigate();
    // Offers data
    const offers = [
        {
            id: 1,
            category: "Bus",
            title: "Save up to Rs 300 on bus tickets",
            validity: "Valid till 30 Nov",
            coupon: "BUS300",
            theme: "pink",
            artwork: <PiBusThin />
        },
        {
            id: 2,
            category: "Bus",
            title: "Save up to Rs 200 on Primo operators.",
            validity: "Valid till 30 Nov",
            coupon: "PRIMODAY",
            theme: "yellow",
            artwork: <CiStar />
        },
        {
            id: 3,
            category: "Bus",
            title: "Save up to Rs 500 on IDFC FIRST Bank Credit cards",
            validity: "Valid till 30 Nov",
            coupon: "IDFC500",
            theme: "light-pink",
            artwork: <CiBank />
        },
        {
            id: 4,
            category: "Bus",
            title: "Save upto Rs 500 on RBL Bank Credit card",
            validity: "Valid till 30 Nov",
            coupon: "RBLCC500",
            theme: "peach",
            artwork: <CiCreditCard1 />
        },
        {
            id: 5,
            category: "Train",
            title: "Enjoy exciting savings on train journeys",
            validity: "Limited period offer",
            coupon: "TRAIN100",
            theme: "yellow",
            artwork: <IoTrainOutline />
        }
    ];

    // Filter offers
    const filteredOffers = offers.filter((offer) => {
        return activeTab === "All" || offer.category === activeTab;
    });

    // Show all or limited offers
    const displayedOffers = showAll
        ? filteredOffers
        : filteredOffers.slice(0, 4);

    // Carousel navigation
    const handleScroll = (direction) => {
        if (offersRef.current) {
            offersRef.current.scrollBy({
                left: direction === "right" ? 500 : -500,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="offers-section">

            {/* Section Header */}
            <div className="offers-header">

                <h2>Offers for you</h2>

                <button
                    className="view-more-btn"
                    onClick={() => setShowAll((prev) => !prev)}
                >
                    {showAll ? "View less" : "View more →"}
                </button>

            </div>

            {/* Filter Tabs */}
            <div className="offers-tabs">

                {["All", "Bus", "Train"].map((tab) => (
                    <button
                        key={tab}
                        className={`offer-tab ${activeTab === tab ? "active" : ""}`}
                        onClick={() => {
                            setActiveTab(tab);
                            setShowAll(false);
                            if (offersRef.current) {
                                offersRef.current.scrollTo({
                                    left: 0,
                                    behavior: "smooth"
                                });
                            }
                        }}
                    >
                        {tab}
                    </button>
                ))}

            </div>

            {/* Offers Cards */}
            <div className={`offers-wrapper ${showAll ? "show-all" : ""}`}>

                <div className="offers-list" ref={offersRef}>

                    {displayedOffers.map((offer) => (

                        <div
                            className={`offer-card ${offer.theme}`}
                            key={offer.id}
                            onClick={() => navigate(`/Coupon/${offer.id}`)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    navigate(`/Coupon/${offer.id}`)
                                }
                            }}
                        >
                            <span className="offer-category">
                                {offer.category}
                            </span>

                            <h3>{offer.title}</h3>

                            <p className="offer-validity">
                                {offer.validity}
                            </p>

                            <div className="offer-bottom">

                                <button
                                    className="offer-coupon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigator.clipboard.writeText(offer.coupon)
                                    }}
                                    title="Copy coupon code"
                                >
                                    <span><MdOutlineLocalOffer /></span>
                                    {offer.coupon}
                                </button>

                                <span className="offer-artwork">
                                    {offer.artwork}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Carousel Arrows */}
                {!showAll && displayedOffers.length > 2 && (
                    <>
                        <button
                            className="offer-arrow left-arrow"
                            onClick={() => handleScroll("left")}
                            aria-label="Previous offers"
                        >
                            ‹
                        </button>

                        <button
                            className="offer-arrow right-arrow"
                            onClick={() => handleScroll("right")}
                            aria-label="Next offers"
                        >
                            ›
                        </button>
                    </>
                )}

            </div>

        </section>
    );
};

export default Offers;
