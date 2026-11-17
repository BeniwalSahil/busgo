
import React from "react";
import "./Newupdate.css";
import mountain from "../../assets/pexels-photo-15952745.avif";
import { BsBusFront } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";

const WhatsNew = () => {

    const newItems = [
        {
            id: 1,
            type: "protection",
            brand: "ACKO",
            title: "Seamless Travel Protection",
            description: "Cancellation, delay & baggage cover",
            details: "48-hr claim settlements",
            button: "Get Started",
            visual: mountain
        },
        {
            id: 2,
            type: "cancellation",
            title: "Free Cancellation",
            description: "Get 100% refund on cancellation",
            button: "Know more",
            visual: <FaRupeeSign />
        },
        {
            id: 3,
            type: "timetable",
            title: "Introducing Bus Timetable",
            description: "Get local bus timings between cities in your state",
            button: "Explore",
            visual: <BsBusFront />
        },
        {
            id: 4,
            type: "flexi",
            title: "FlexiTicket",
            description: "Get amazing benefits on Date Change & Cancellation",
            button: "Know More",
            visual: "⇄"
        }
    ];

    return (
        <section className="whats-new-section">

            <div className="whats-new-heading">
                <h2>What's new</h2>
            </div>

            <div className="whats-new-grid">

                {newItems.map((item) => (

                    <div
                        className={`whats-new-card ${item.type}`}
                        key={item.id}
                    >

                        <div className="whats-new-content">

                            {item.brand && (
                                <span className="whats-new-brand">
                                    {item.brand}
                                    <small>FOR BUSINESS</small>
                                </span>
                            )}

                            <h3>{item.title}</h3>

                            <p>{item.description}</p>

                            {item.details && (
                                <small>{item.details}</small>
                            )}

                            <button className="whats-new-btn">
                                {item.button} →
                            </button>

                        </div>

                        <div className="whats-new-visual">

                            {item.type === "cancellation" ? (
                                <div className="refund-symbol">
                                    ₹
                                </div>
                            ) : item.type === "timetable" ? (
                                <div className="bus-visual">
                                    {item.visual}
                                </div>
                            ) : item.type === "flexi" ? (
                                <div className="flexi-visual">
                                    <span>⇄</span>
                                    <strong>FREE<br />DATE<br />CHANGE</strong>
                                </div>
                            ) : (
                                <img
                                    src={item.visual}
                                    alt={item.title}
                                    className="whats-new-image"
                                />
                            )}

                        </div>

                    </div>

                ))}

            </div>

        </section>
    );
};

export default WhatsNew;
