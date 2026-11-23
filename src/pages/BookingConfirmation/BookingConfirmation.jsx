
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingConfirmation.css";

const BookingConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        bus,
        from,
        to,
        journeyDate,
        selectSeat = [],
        passengers = [],
        contact = {},
        totalAmount,
        paymentMethod,
        bookingId,
        paymentStatus,
    } = location.state || {};

    if (!bus || !bookingId) {
        return (
            <div className="confirmation-error">
                <h2>Booking details not found</h2>
                <p>Please complete your booking first.</p>
                <button onClick={() => navigate("/")}>
                    Go to Home
                </button>
            </div>
        );
    }

    const handlePrint = () => {
        window.print();
    };

    const handleHome = () => {
        navigate("/");
    };

    const formattedDate = journeyDate
        ? new Date(`${journeyDate}T00:00:00`).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "—";

    const methodNames = {
        upi: "UPI",
        card: "Credit / Debit Card",
        netbanking: "Net Banking",
        wallet: "Wallet",
    };

    return (
        <div className="confirmation-page">
            <div className="confirmation-container">

                {/* Success Header */}
                <div className="confirmation-success">
                    <div className="success-icon">✓</div>

                    <h1>Booking Confirmed!</h1>

                    <p>
                        Your bus ticket has been successfully booked.
                        Have a safe and happy journey!
                    </p>

                    <span className="confirmation-status">
                        {paymentStatus || "Success"}
                    </span>
                </div>

                {/* Ticket - Only this section will print */}
                <div className="booking-ticket">

                    {/* Ticket Header */}
                    <div className="ticket-header">
                        <div className="ticket-brand">
                            <h2><span>BUS</span>GO</h2>
                            <p>Your Journey, Our Priority</p>
                        </div>

                        <div className="ticket-id">
                            <span>BOOKING ID</span>
                            <strong>#{bookingId}</strong>
                        </div>
                    </div>

                    {/* Route Details */}
                    <div className="ticket-route">
                        <div>
                            <span>FROM</span>
                            <h2>{from}</h2>
                            <p>{bus.departure}</p>
                        </div>

                        <div className="ticket-route-line">
                            <div></div>
                        </div>

                        <div className="ticket-destination">
                            <span>TO</span>
                            <h2>{to}</h2>
                            <p>{bus.arrival}</p>
                        </div>
                    </div>

                    {/* Bus Details */}
                    <div className="ticket-details-grid">
                        <div>
                            <span>JOURNEY DATE</span>
                            <strong>{formattedDate}</strong>
                        </div>

                        <div>
                            <span>BUS OPERATOR</span>
                            <strong>{bus.operator}</strong>
                        </div>

                        <div>
                            <span>BUS TYPE</span>
                            <strong>{bus.busType}</strong>
                        </div>

                        <div>
                            <span>DURATION</span>
                            <strong>{bus.duration || "—"}</strong>
                        </div>

                        <div>
                            <span>DEPARTURE</span>
                            <strong>{bus.departure}</strong>
                        </div>

                        <div>
                            <span>ARRIVAL</span>
                            <strong>{bus.arrival}</strong>
                        </div>
                    </div>

                    {/* Passenger Details */}
                    <div className="ticket-passengers">
                        <h3>Passenger Details</h3>

                        <div className="passenger-table-wrapper">
                            <table className="ticket-passenger-table">
                                <thead>
                                    <tr>
                                        <th>Passenger</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Seat No.</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {passengers.map((passenger, index) => (
                                        <tr key={`${passenger.seat}-${index}`}>
                                            <td>{passenger.name}</td>
                                            <td>{passenger.age}</td>
                                            <td>{passenger.gender}</td>
                                            <td>
                                                <strong>{passenger.seat}</strong>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="ticket-payment">
                        <div>
                            <span>CONTACT NUMBER</span>
                            <strong>{contact.mobile || "—"}</strong>
                        </div>

                        <div>
                            <span>PAYMENT METHOD</span>
                            <strong>
                                {methodNames[paymentMethod] || paymentMethod || "—"}
                            </strong>
                        </div>

                        <div>
                            <span>PAYMENT STATUS</span>
                            <strong className="paid-status">
                                {paymentStatus || "Success"}
                            </strong>
                        </div>
                    </div>

                    {/* Total Amount */}
                    <div className="ticket-total">
                        <span>Total Amount Paid</span>
                        <strong>₹{totalAmount ?? 0}</strong>
                    </div>

                    {/* Ticket Footer */}
                    <div className="ticket-footer">
                        <p>Please carry a valid ID proof during your journey.</p>
                        <p>Thank you for booking with BUSGO!</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="confirmation-actions">
                    <button
                        className="print-ticket-btn"
                        onClick={handlePrint}
                    >
                        Print Ticket
                    </button>

                    <button
                        className="home-ticket-btn"
                        onClick={handleHome}
                    >
                        Back to Home
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BookingConfirmation;
