
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SelectSeats.css";

const SelectSeats = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { bus, from, to, journeyDate } = location.state || {};

    const [selectedSeats, setSelectedSeats] = useState([]);

    // If user opens this page without selecting a bus
    if (!bus) {
        return (
            <div className="seat-error">
                <h2>No bus selected</h2>
                <button onClick={() => navigate("/bus-listing")}>
                    Go to Bus Listing
                </button>
            </div>
        );
    }

    const totalSeats = 15;
    const availableSeats = Math.min(
        Math.max(Number(bus.seats) || 0, 0),
        totalSeats
    );

    const seats = Array.from({ length: totalSeats }, (_, index) => ({
        id: `S${index + 1}`,
        number: index + 1,
        available: index < availableSeats,
    }));

    const seatPrice = Number(bus.price) || 0;
    const totalAmount = selectedSeats.length * seatPrice;

    const handleSeatClick = (seat) => {
        if (!seat.available) return;

        setSelectedSeats((previous) =>
            previous.includes(seat.id)
                ? previous.filter((item) => item !== seat.id)
                : [...previous, seat.id]
        );
    };

    const handleContinue = () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat.");
            return;
        }

        navigate("/PassengerDetails", {
            state: {
                bus,
                from,
                to,
                journeyDate,
                selectedSeats,
                totalAmount,
            },
        });
    };

    return (
        <div className="select-seat-page">
            <div className="seat-page-container">

                {/* Journey Information */}
                <div className="seat-journey-info">
                    <div>
                        <span className="seat-label">Journey</span>
                        <h2>{from} → {to}</h2>
                        <p>{journeyDate}</p>
                    </div>

                    <div className="seat-bus-info">
                        <h3>{bus.operator}</h3>
                        <p>{bus.busType}</p>
                        <span>{bus.departure} - {bus.arrival}</span>
                    </div>
                </div>

                <div className="seat-main-layout">

                    {/* Seat Selection */}
                    <div className="seat-selection-card">
                        <div className="seat-card-heading">
                            <div>
                                <h2>Select Your Seats</h2>
                                <p>Choose your preferred seats</p>
                            </div>
                            <span className="seat-price">₹{seatPrice} / seat</span>
                        </div>

                        {/* Seat Legend */}
                        <div className="seat-legend">
                            <div>
                                <span className="legend-box available"></span>
                                Available
                            </div>
                            <div>
                                <span className="legend-box selected"></span>
                                Selected
                            </div>
                            <div>
                                <span className="legend-box booked"></span>
                                Booked
                            </div>
                        </div>

                        {/* Bus Layout */}
                        <div className="bus-layout">
                            <div className="driver-area">
                                <span>FRONT</span>
                                <div className="steering">◉</div>
                            </div>

                            <div className="seat-grid">
                                {seats.map((seat, index) => {
                                    const isSelected = selectedSeats.includes(seat.id);

                                    return (
                                        <React.Fragment key={seat.id}>
                                            {index % 3 === 2 && (
                                                <div className="seat-aisle"></div>
                                            )}

                                            <button
                                                type="button"
                                                disabled={!seat.available}
                                                onClick={() => handleSeatClick(seat)}
                                                className={`bus-seat ${!seat.available
                                                    ? "booked-seat"
                                                    : isSelected
                                                        ? "selected-seat"
                                                        : "available-seat"
                                                    }`}
                                                title={
                                                    seat.available
                                                        ? `Select ${seat.id}`
                                                        : `${seat.id} is booked`
                                                }
                                            >
                                                <span>{seat.id}</span>
                                                <small>₹{seatPrice}</small>
                                            </button>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>

                        <p className="seat-demo-note">
                            Demo seat layout: seat availability is based on your sample bus data.
                        </p>
                    </div>

                    {/* Booking Summary */}
                    <div className="seat-summary-card">
                        <h2>Booking Summary</h2>

                        <div className="summary-route">
                            <span>{from}</span>
                            <span>→</span>
                            <span>{to}</span>
                        </div>

                        <div className="summary-detail">
                            <span>Bus Operator</span>
                            <strong>{bus.operator}</strong>
                        </div>

                        <div className="summary-detail">
                            <span>Journey Date</span>
                            <strong>{journeyDate}</strong>
                        </div>

                        <div className="summary-detail">
                            <span>Selected Seats</span>
                            <strong>
                                {selectedSeats.length > 0
                                    ? selectedSeats.join(", ")
                                    : "Not selected"}
                            </strong>
                        </div>

                        <div className="summary-detail">
                            <span>Seat Price</span>
                            <strong>₹{seatPrice}</strong>
                        </div>

                        <div className="summary-detail">
                            <span>Total Seats</span>
                            <strong>{selectedSeats.length}</strong>
                        </div>

                        <div className="summary-total">
                            <span>Total Amount</span>
                            <strong>₹{totalAmount}</strong>
                        </div>

                        <button
                            className="continue-seat-btn"
                            onClick={handleContinue}
                        >
                            Continue
                        </button>

                        <p className="secure-note">
                            Your booking details will be carried to the next step.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SelectSeats;
