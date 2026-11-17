
import React, { useRef } from "react";
import "./GovernmentBuses.css";

const GovernmentBuses = () => {

    const sliderRef = useRef(null);

    const operators = [
        {
            id: 1,
            name: "HRTC",
            fullName: "हिमाचल रोड ट्रांसपोर्ट कॉर्पोरेशन",
            rating: "3.98",
            services: "480",
            busTypes: "Volvo Bus, AC & Non AC Bus",
            logo: "H",
            logoClass: "hrtc-logo"
        },
        {
            id: 2,
            name: "ASTC",
            fullName: "असम राज्यिक परिवहन निगम",
            rating: "4.02",
            services: "200",
            busTypes: "Volvo Bus, AC & Non AC Bus",
            logo: "A",
            logoClass: "astc-logo"
        },
        {
            id: 3,
            name: "UPSRTC",
            fullName: "उत्तर प्रदेश राज्य सड़क परिवहन निगम",
            rating: "3.94",
            services: "1738",
            busTypes: "Janrath, Shatabdi and more",
            logo: "UP",
            logoClass: "upsrtc-logo"
        },
        {
            id: 4,
            name: "CTU",
            fullName: "चंडीगढ़ परिवहन उपक्रम",
            rating: "4.01",
            services: "143",
            busTypes: "AC, Ordinary Bus and more",
            logo: "CTU",
            logoClass: "ctu-logo"
        },
        {
            id: 5,
            name: "SBSTC",
            fullName: "দক্ষিণবঙ্গ রাষ্ট্রীয় পরিবহণ সংস্থা",
            rating: "3.95",
            services: "350",
            busTypes: "Express, AC and Ordinary Bus",
            logo: "S",
            logoClass: "sbstc-logo"
        }
    ];

    // Slider functionality using useRef
    const handleScroll = (direction) => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: direction === "right" ? 390 : -390,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="government-section">

            <div className="government-heading">
                <div>
                    <span className="government-subtitle">
                        TRAVEL WITH TRUST
                    </span>

                    <h2>Government Buses</h2>

                    <p>
                        Book your journey with trusted state transport operators.
                    </p>
                </div>

                <button className="government-view-btn">
                    View all →
                </button>
            </div>

            {/* Government Bus Slider */}
            <div className="government-slider-wrapper">

                <button
                    className="government-arrow government-left-arrow"
                    onClick={() => handleScroll("left")}
                    aria-label="Previous buses"
                >
                    &#8249;
                </button>

                <div className="government-slider" ref={sliderRef}>

                    {operators.map((operator) => (

                        <div className="government-card" key={operator.id}>

                            {/* Header */}
                            <div className="government-card-header">

                                <div className={`government-logo ${operator.logoClass}`}>
                                    {operator.logo}
                                </div>

                                <div className="government-operator-info">

                                    <div className="government-name-row">
                                        <h3>{operator.name}</h3>

                                        <span className="government-rating">
                                            ★ {operator.rating}
                                        </span>
                                    </div>

                                    <p>{operator.fullName}</p>

                                </div>

                            </div>

                            {/* Body */}
                            <div className="government-card-body">

                                <p className="government-services">
                                    {operator.services} services including
                                    {" "}{operator.busTypes}
                                </p>

                                <div className="government-partner">
                                    <span className="partner-icon">
                                        BUSGO
                                    </span>

                                    <span>
                                        Official booking partner of {operator.name}
                                    </span>
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="government-card-footer">

                                <span className="refund-icon">↻</span>

                                Get instant refund with UPI payments

                            </div>

                        </div>

                    ))}

                </div>

                <button
                    className="government-arrow government-right-arrow"
                    onClick={() => handleScroll("right")}
                    aria-label="Next buses"
                >
                    &#8250;
                </button>

            </div>

        </section>
    );
};

export default GovernmentBuses;
