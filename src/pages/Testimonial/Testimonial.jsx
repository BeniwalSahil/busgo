import React from "react";
import "./Testimonial.css";
import { LiaBusSolid } from "react-icons/lia";
import { GoCheckCircleFill } from "react-icons/go";

const Testimonial = () => {
    const reviews = [
        {
            id: 1,
            name: "Rahul Sharma",
            location: "Delhi",
            route: "Delhi → Jaipur",
            rating: 5,
            review:
                "Booking my bus ticket was super easy! The seat selection was smooth, and the entire experience was excellent.",
            initial: "R",
            color: "blue",
        },
        {
            id: 2,
            name: "Priya Verma",
            location: "Gurugram",
            route: "Gurugram → Chandigarh",
            rating: 5,
            review:
                "I really liked the simple booking process. Finding buses and comparing options was quick and convenient.",
            initial: "P",
            color: "pink",
        },
        {
            id: 3,
            name: "Amit Kumar",
            location: "Noida",
            route: "Noida → Lucknow",
            rating: 4,
            review:
                "A clean and user-friendly platform. I could easily find my preferred bus and complete my booking.",
            initial: "A",
            color: "orange",
        },
    ];

    return (
        <section className="testimonial-section">
            <div className="testimonial-container">

                <div className="testimonial-heading">
                    <span className="testimonial-tag">CUSTOMER STORIES</span>
                    <h2>
                        What Our <span>Travellers</span> Say
                    </h2>
                    <p>
                        Real experiences from people who make every journey
                        better with BUSGO.
                    </p>
                </div>

                <div className="testimonial-grid">
                    {reviews.map((item) => (
                        <div className="testimonial-card" key={item.id}>

                            <div className="testimonial-card-top">
                                <div className="testimonial-stars">
                                    {"★".repeat(item.rating)}
                                    <span>{"★".repeat(5 - item.rating)}</span>
                                </div>

                                <div className="quote-icon">“</div>
                            </div>

                            <p className="testimonial-review">
                                {item.review}
                            </p>

                            <div className="testimonial-user">
                                <div className={`testimonial-avatar ${item.color}`}>
                                    {item.initial}
                                </div>

                                <div>
                                    <h4>{item.name}</h4>
                                    <span>{item.route}</span>
                                </div>

                                <div className="verified-review">
                                    <span><GoCheckCircleFill /></span> Traveller
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonial;