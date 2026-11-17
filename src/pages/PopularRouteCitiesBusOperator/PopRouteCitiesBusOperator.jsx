
import React, { useState } from "react";
import "./PopRouteCitiesBusOperator.css";
import bannerimage from '../../assets/HomeBanner.webp'

const PopularLinks = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const popularData = [
        {
            id: 1,
            title: "Popular Routes",
            links: [
                "Delhi to Jaipur",
                "Delhi to Chandigarh",
                "Delhi to Lucknow",
                "Mumbai to Pune",
                "Bangalore to Chennai",
                "Jaipur to Delhi",
                "Pune to Mumbai",
                "Chennai to Bangalore",
            ],
        },
        {
            id: 2,
            title: "Popular Cities",
            links: [
                "Delhi",
                "Mumbai",
                "Bangalore",
                "Jaipur",
                "Pune",
                "Chandigarh",
                "Lucknow",
                "Chennai",
            ],
        },
        {
            id: 3,
            title: "Popular Bus Operators",
            links: [
                "IntrCity SmartBus",
                "VRL Travels",
                " zingbus",
                "Orange Travels",
                "SRS Travels",
                "Hans Travels",
                "RSRTC",
                "UPSRTC",
            ],
        },
    ];

    const handleDropdown = (id) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    return (
        <section className="popular-links-section">
            <div className="popular-links-container">

                {popularData.map((item) => (
                    <div className="popular-links-item" key={item.id}>

                        <button
                            className={`popular-links-heading ${activeDropdown === item.id ? "active" : ""
                                }`}
                            onClick={() => handleDropdown(item.id)}
                            aria-expanded={activeDropdown === item.id}
                        >
                            <span>{item.title}</span>

                            <i
                                className={`fa-solid fa-chevron-down ${activeDropdown === item.id ? "rotate" : ""
                                    }`}
                            ></i>
                        </button>

                        {activeDropdown === item.id && (
                            <div className="popular-links-content">
                                {item.links.map((link, index) => (
                                    <a href="#" key={index}>
                                        {link}
                                    </a>
                                ))}
                            </div>
                        )}

                    </div>
                ))}

            </div>
        </section>
    );
};

export default PopularLinks;
