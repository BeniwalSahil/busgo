import React, { useState } from "react";
import "./Faq.css";

const FAQ = () => {
    const [activeTab, setActiveTab] = useState("Cancellation & Refund");
    const [openIndex, setOpenIndex] = useState(null);

    const faqData = {
        General: [
            {
                question: "What is BUSGO?",
                answer:
                    "BUSGO is an online bus booking platform where you can search for buses, compare options and book your journey easily.",
            },
            {
                question: "How can I book a bus ticket on BUSGO?",
                answer:
                    "Enter your source, destination and journey date. Select a bus, choose your seat and complete the booking process.",
            },
            {
                question: "Do I need to create an account to book tickets?",
                answer:
                    "You can explore available buses without an account. You may need to provide your details during booking.",
            },
        ],

        "Ticket-related": [
            {
                question: "How can I download my bus ticket?",
                answer:
                    "After a successful booking, you can view and download your ticket from the My Bookings section.",
            },
            {
                question: "Where can I find my booking details?",
                answer:
                    "Your booking details are available in the My Bookings section of your BUSGO account.",
            },
            {
                question: "Can I change my passenger details?",
                answer:
                    "Passenger detail changes depend on the bus operator's policy. Please check the booking conditions.",
            },
        ],

        Payment: [
            {
                question: "What payment methods are available?",
                answer:
                    "You can use the payment methods displayed at checkout. Available options may include UPI, cards and net banking.",
            },
            {
                question: "What happens if my payment fails?",
                answer:
                    "If your payment fails, check your bank or payment app for the transaction status before trying again.",
            },
            {
                question: "My money was deducted but ticket is not booked. What should I do?",
                answer:
                    "Please check your booking status first. If the amount was deducted but the booking failed, contact customer support with your transaction details.",
            },
        ],

        "Cancellation & Refund": [
            {
                question: "Can I cancel my bus ticket online?",
                answer:
                    "Yes, you can request cancellation through the My Bookings section. Refund eligibility depends on the bus operator's cancellation policy.",
            },
            {
                question: "How can I cancel a bus ticket online?",
                answer:
                    "Go to My Bookings, select the ticket you want to cancel and click on the cancellation option. Review the cancellation charges before confirming.",
            },
            {
                question: "I missed the bus. Do I get a refund?",
                answer:
                    "Refunds for missed buses depend on the bus operator's policy. Please contact customer support for assistance.",
            },
        ],
    };

    const currentFAQs = faqData[activeTab];

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setOpenIndex(null);
    };

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="banner-section-details">
                <div className="main-banner">
                    <div className="main-banner-content">
                        <div className="inner-banner-content">
                            {/* <img src={bannerimage} alt="image" /> */}
                            <h2>Grab up to 50% off now</h2>
                            <p>Enjoy Your Trip with BUSGO!</p>
                        </div>
                    </div>
                    <div className="main-banner-logo-etc">

                    </div>
                </div>
            </div>
            <div className="faq-container">

                <div className="faq-heading">
                    <h2>FAQs related to Bus Tickets Booking</h2>
                </div>

                <div className="faq-tabs">
                    {Object.keys(faqData).map((tab) => (
                        <button
                            key={tab}
                            className={`faq-tab ${activeTab === tab ? "active" : ""
                                }`}
                            onClick={() => handleTabChange(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="faq-list">
                    {currentFAQs.map((faq, index) => (
                        <div className="faq-item" key={index}>

                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span>{faq.question}</span>

                                <span
                                    className={`faq-arrow ${openIndex === index ? "rotate" : ""
                                        }`}
                                >
                                    <i className="fa-solid fa-chevron-down"></i>
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQ;