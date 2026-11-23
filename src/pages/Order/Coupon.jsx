
import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./CouponDetails.css";

const allOffers = [
    {
        id: 1,
        category: "Bus",
        title: "Save up to Rs 300 on bus tickets",
        validity: "Valid till 30 Nov",
        coupon: "BUS300",
        theme: "pink",
        discount: "Up to ₹300 OFF",
        description: "Get exciting discounts on your next bus journey with BUSGO.",
        minimum: "Minimum booking amount as per offer terms.",
    },
    {
        id: 2,
        category: "Bus",
        title: "Save up to Rs 200 on Primo operators.",
        validity: "Valid till 30 Nov",
        coupon: "PRIMODAY",
        theme: "yellow",
        discount: "Up to ₹200 OFF",
        description: "Enjoy special savings on eligible Primo bus operators.",
        minimum: "Applicable on eligible Primo operators.",
    },
    {
        id: 3,
        category: "Bus",
        title: "Save up to Rs 500 on IDFC FIRST Bank Credit cards",
        validity: "Valid till 30 Nov",
        coupon: "IDFC500",
        theme: "light-pink",
        discount: "Up to ₹500 OFF",
        description: "Pay using an eligible IDFC FIRST Bank credit card and save on your booking.",
        minimum: "Eligible IDFC FIRST Bank credit cards only.",
    },
    {
        id: 4,
        category: "Bus",
        title: "Save upto Rs 500 on RBL Bank Credit card",
        validity: "Valid till 30 Nov",
        coupon: "RBLCC500",
        theme: "peach",
        discount: "Up to ₹500 OFF",
        description: "Get exciting savings when you book using an eligible RBL Bank credit card.",
        minimum: "Eligible RBL Bank credit cards only.",
    },
    {
        id: 5,
        category: "Train",
        title: "Enjoy exciting savings on train journeys",
        validity: "Limited period offer",
        coupon: "TRAIN100",
        theme: "yellow",
        discount: "Special Train Offer",
        description: "Enjoy exciting savings on eligible train journeys.",
        minimum: "Applicable to eligible train bookings.",
    },
];

const CouponDetails = () => {

    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const offer =
        location.state?.offer ||
        allOffers.find((item) => item.id === Number(id));

    if (!offer) {
        return (
            <div className="coupon-not-found">
                <h2>Offer Not Found</h2>
                <button onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        );
    }

    const copyCoupon = () => {
        navigator.clipboard.writeText(offer.coupon);
    };

    return (
        <section className="coupon-details-page">

            <div className="coupon-details-container">

                <button
                    className="coupon-back-btn"
                    onClick={() => navigate(-1)}
                >
                    ← Back to Offers
                </button>

                <div className="coupon-details-card">

                    <div className={`coupon-details-banner ${offer.theme}`}>
                        <span>{offer.category} OFFER</span>
                        <h1>{offer.discount}</h1>
                        <p>{offer.title}</p>
                    </div>

                    <div className="coupon-details-content">

                        <h2>Offer Details</h2>

                        <p>{offer.description}</p>

                        <div className="coupon-details-code">
                            <div>
                                <span>COUPON CODE</span>
                                <h3>{offer.coupon}</h3>
                            </div>

                            <button onClick={copyCoupon}>
                                Copy Code
                            </button>
                        </div>

                        <div className="coupon-info">
                            <div>
                                <span>Offer Validity</span>
                                <strong>{offer.validity}</strong>
                            </div>

                            <div>
                                <span>Category</span>
                                <strong>{offer.category}</strong>
                            </div>

                            <div>
                                <span>Eligibility</span>
                                <strong>{offer.minimum}</strong>
                            </div>
                        </div>

                        <div className="coupon-terms-details">
                            <h3>Terms & Conditions</h3>
                            <ul>
                                <li>Offer is subject to eligibility.</li>
                                <li>Only the displayed coupon code can be used for this offer.</li>
                                <li>Offer validity and discount depend on the applicable terms.</li>
                                <li>BUSGO reserves the right to modify promotional offers.</li>
                            </ul>
                        </div>

                        <button
                            className="coupon-book-btn"
                            onClick={() => navigate("/")}
                        >
                            Explore Buses
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default CouponDetails;
