
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PassengerDetails.css";

const PassengerDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        bus,
        from,
        to,
        journeyDate,
        totalAmount,
    } = location.state || {};

    // Supports both state variable names
    const selectSeat =
        location.state?.selectSeat ||
        location.state?.selectedSeats ||
        [];

    const [passengers, setPassengers] = useState(() =>
        selectSeat.map((seat) => ({
            seat,
            name: "",
            age: "",
            gender: "",
        }))
    );

    const [contact, setContact] = useState({
        mobile: "",
        email: "",
    });

    if (!bus || selectSeat.length === 0) {
        return (
            <div className="passenger-error">
                <h2>Booking details not found</h2>
                <p>Please select a bus and seats first.</p>
                <button onClick={() => navigate("/bus-listing")}>
                    Go to Bus Listing
                </button>
            </div>
        );
    }

    const updatePassenger = (index, field, value) => {
        setPassengers((previous) =>
            previous.map((passenger, i) =>
                i === index
                    ? { ...passenger, [field]: value }
                    : passenger
            )
        );
    };

    const handleContactChange = (field, value) => {
        setContact((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handleContinue = (e) => {
        e.preventDefault();

        const incompletePassenger = passengers.some(
            (passenger) =>
                !passenger.name.trim() ||
                !passenger.age ||
                Number(passenger.age) < 1 ||
                Number(passenger.age) > 120 ||
                !passenger.gender
        );

        if (incompletePassenger) {
            alert("Please enter valid details for every passenger.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(contact.mobile)) {
            alert("Please enter a valid 10-digit Indian mobile number.");
            return;
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
        ) {
            alert("Please enter a valid email address.");
            return;
        }

        navigate("/Payment", {
            state: {
                bus,
                from,
                to,
                journeyDate,
                selectSeat,
                passengers,
                contact,
                totalAmount,
            },
        });
    };

    return (
        <div className="passenger-page">
            <div className="passenger-container">

                <div className="passenger-heading">
                    <span>BUSGO BOOKING</span>
                    <h1>Passenger Details</h1>
                    <p>Enter passenger and contact information to continue.</p>
                </div>

                <form onSubmit={handleContinue}>
                    <div className="passenger-layout">

                        {/* Passenger Form */}
                        <div className="passenger-form-section">

                            {passengers.map((passenger, index) => (
                                <div className="passenger-card" key={passenger.seat}>
                                    <div className="passenger-card-heading">
                                        <div>
                                            <h2>Passenger {index + 1}</h2>
                                            <p>Enter passenger information</p>
                                        </div>

                                        <span className="passenger-seat-tag">
                                            Seat {passenger.seat}
                                        </span>
                                    </div>

                                    <div className="passenger-fields">
                                        <div className="passenger-field full-width">
                                            <label>Full Name *</label>
                                            <input
                                                type="text"
                                                placeholder="Enter passenger full name"
                                                value={passenger.name}
                                                onChange={(e) =>
                                                    updatePassenger(index, "name", e.target.value)
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="passenger-field">
                                            <label>Age *</label>
                                            <input
                                                type="number"
                                                min="1"
                                                max="120"
                                                placeholder="Enter age"
                                                value={passenger.age}
                                                onChange={(e) =>
                                                    updatePassenger(index, "age", e.target.value)
                                                }
                                                onWheel={(e) => e.currentTarget.blur()}
                                                required
                                            />
                                        </div>

                                        <div className="passenger-field">
                                            <label>Gender *</label>
                                            <select
                                                value={passenger.gender}
                                                onChange={(e) =>
                                                    updatePassenger(index, "gender", e.target.value)
                                                }
                                                required
                                            >
                                                <option value="">Select gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Contact Information */}
                            <div className="passenger-card">
                                <div className="passenger-card-heading">
                                    <div>
                                        <h2>Contact Information</h2>
                                        <p>Booking confirmation will be sent here</p>
                                    </div>
                                </div>

                                <div className="passenger-fields">
                                    <div className="passenger-field">
                                        <label>Mobile Number *</label>
                                        <input
                                            type="tel"
                                            maxLength="10"
                                            placeholder="10-digit mobile number"
                                            value={contact.mobile}
                                            onChange={(e) =>
                                                handleContactChange(
                                                    "mobile",
                                                    e.target.value.replace(/\D/g, "")
                                                )
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="passenger-field">
                                        <label>Email Address *</label>
                                        <input
                                            type="email"
                                            placeholder="Enter email address"
                                            value={contact.email}
                                            onChange={(e) =>
                                                handleContactChange("email", e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="passenger-continue-btn">
                                Continue to Payment
                            </button>
                        </div>

                        {/* Booking Summary */}
                        <aside className="passenger-summary">
                            <h2>Booking Summary</h2>

                            <div className="passenger-route">
                                <strong>{from}</strong>
                                <span>→</span>
                                <strong>{to}</strong>
                            </div>

                            <div className="passenger-summary-row">
                                <span>Bus Operator</span>
                                <strong>{bus.operator}</strong>
                            </div>

                            <div className="passenger-summary-row">
                                <span>Bus Type</span>
                                <strong>{bus.busType}</strong>
                            </div>

                            <div className="passenger-summary-row">
                                <span>Journey Date</span>
                                <strong>{journeyDate}</strong>
                            </div>

                            <div className="passenger-summary-row">
                                <span>Departure</span>
                                <strong>{bus.departure}</strong>
                            </div>

                            <div className="passenger-summary-row">
                                <span>Selected Seats</span>
                                <strong>{selectSeat.join(", ")}</strong>
                            </div>

                            <div className="passenger-summary-row">
                                <span>Total Passengers</span>
                                <strong>{passengers.length}</strong>
                            </div>

                            <div className="passenger-total">
                                <span>Total Amount</span>
                                <strong>
                                    ₹{totalAmount ?? passengers.length * bus.price}
                                </strong>
                            </div>

                            <p className="passenger-summary-note">
                                Please check your journey and passenger details before
                                proceeding.
                            </p>
                        </aside>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default PassengerDetails;
