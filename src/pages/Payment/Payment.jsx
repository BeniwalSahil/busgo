
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
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
    } = location.state || {};

    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [upiId, setUpiId] = useState("");
    const [cardDetails, setCardDetails] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
    });
    const [bank, setBank] = useState("");
    const [wallet, setWallet] = useState("");

    const [processing, setProcessing] = useState(false);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmedBooking, setConfirmedBooking] = useState(null);

    const amount = Number(totalAmount ?? passengers.length * (bus?.price || 0));

    if (!bus || passengers.length === 0) {
        return (
            <div className="payment-error">
                <h2>Booking details not found</h2>
                <p>Please complete passenger details first.</p>
                <button onClick={() => navigate("/bus-listing")}>
                    Go to Bus Listing
                </button>
            </div>
        );
    }

    const handleCardChange = (field, value) => {
        setCardDetails((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const handlePayment = (e) => {
        e.preventDefault();

        if (paymentMethod === "upi" && !/^[\w.-]+@[\w.-]+$/.test(upiId)) {
            alert("Please enter a valid UPI ID, e.g. name@upi");
            return;
        }

        if (paymentMethod === "card") {
            const cardNumber = cardDetails.number.replace(/\s/g, "");

            if (!/^\d{16}$/.test(cardNumber)) {
                alert("Please enter a valid 16-digit card number.");
                return;
            }

            if (!cardDetails.name.trim()) {
                alert("Please enter the card holder name.");
                return;
            }

            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
                alert("Please enter expiry in MM/YY format.");
                return;
            }

            if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
                alert("Please enter a valid CVV.");
                return;
            }
        }

        if (paymentMethod === "netbanking" && !bank) {
            alert("Please select your bank.");
            return;
        }

        if (paymentMethod === "wallet" && !wallet) {
            alert("Please select a wallet.");
            return;
        }

        // Demo payment simulation
        setProcessing(true);

        setTimeout(() => {
            const bookingId = `BUSGO${Date.now().toString().slice(-8)}`;

            const booking = {
                bus,
                from,
                to,
                journeyDate,
                selectSeat,
                passengers,
                contact,
                totalAmount: amount,
                paymentMethod,
                bookingId,
                paymentStatus: "Success",
                bookingStatus: "Confirmed",
                userEmail: JSON.parse(
                    localStorage.getItem("busgoCurrentUser") || "null"
                )?.email,
            };

            // Save booking in localStorage
            const existingBookings = JSON.parse(
                localStorage.getItem("busgoBookings") || "[]"
            );

            localStorage.setItem(
                "busgoBookings",
                JSON.stringify([...existingBookings, booking])
            );

            setConfirmedBooking(booking);

            // setConfirmedBooking({
            //     bus,
            //     from,
            //     to,
            //     journeyDate,
            //     selectSeat,
            //     passengers,
            //     contact,
            //     totalAmount: amount,
            //     paymentMethod,
            //     bookingId,
            //     paymentStatus: "Success",
            // });

            setProcessing(false);
            setShowConfirmation(true);
        }, 1200);
    };

    return (
        <div className="payment-page">
            <div className="payment-container">

                <div className="payment-heading">
                    <span>BUSGO BOOKING</span>
                    <h1>Complete Your Payment</h1>
                    <p>Choose your preferred payment method to continue.</p>
                </div>

                <form onSubmit={handlePayment}>
                    <div className="payment-layout">

                        {/* Payment Methods */}
                        <div className="payment-methods-card">
                            <h2>Payment Method</h2>
                            <p className="payment-subtitle">
                                Select one of the available payment options.
                            </p>

                            <div className="payment-method-list">

                                <button
                                    type="button"
                                    className={`payment-method ${paymentMethod === "upi" ? "active" : ""
                                        }`}
                                    onClick={() => setPaymentMethod("upi")}
                                >
                                    <span className="payment-method-icon">₹</span>
                                    <span>
                                        <strong>UPI</strong>
                                        <small>Google Pay, PhonePe, Paytm</small>
                                    </span>
                                    <span className="payment-radio">
                                        {paymentMethod === "upi" ? "●" : "○"}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className={`payment-method ${paymentMethod === "card" ? "active" : ""
                                        }`}
                                    onClick={() => setPaymentMethod("card")}
                                >
                                    <span className="payment-method-icon">▣</span>
                                    <span>
                                        <strong>Credit / Debit Card</strong>
                                        <small>Visa, Mastercard, RuPay</small>
                                    </span>
                                    <span className="payment-radio">
                                        {paymentMethod === "card" ? "●" : "○"}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className={`payment-method ${paymentMethod === "netbanking" ? "active" : ""
                                        }`}
                                    onClick={() => setPaymentMethod("netbanking")}
                                >
                                    <span className="payment-method-icon">▤</span>
                                    <span>
                                        <strong>Net Banking</strong>
                                        <small>Pay directly through your bank</small>
                                    </span>
                                    <span className="payment-radio">
                                        {paymentMethod === "netbanking" ? "●" : "○"}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className={`payment-method ${paymentMethod === "wallet" ? "active" : ""
                                        }`}
                                    onClick={() => setPaymentMethod("wallet")}
                                >
                                    <span className="payment-method-icon">▣</span>
                                    <span>
                                        <strong>Wallet</strong>
                                        <small>Choose your preferred wallet</small>
                                    </span>
                                    <span className="payment-radio">
                                        {paymentMethod === "wallet" ? "●" : "○"}
                                    </span>
                                </button>
                            </div>

                            {/* UPI Form */}
                            {paymentMethod === "upi" && (
                                <div className="payment-input-section">
                                    <h3>Enter UPI ID</h3>
                                    <label>UPI ID</label>
                                    <input
                                        type="text"
                                        placeholder="example@upi"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                    />
                                    <p>Example: yourname@okaxis</p>
                                </div>
                            )}

                            {/* Card Form */}
                            {paymentMethod === "card" && (
                                <div className="payment-input-section">
                                    <h3>Card Details</h3>

                                    <label>Card Number</label>
                                    <input
                                        type="text"
                                        maxLength="19"
                                        placeholder="1234 5678 9012 3456"
                                        value={cardDetails.number}
                                        onChange={(e) =>
                                            handleCardChange(
                                                "number",
                                                e.target.value
                                                    .replace(/\D/g, "")
                                                    .slice(0, 16)
                                                    .replace(/(.{4})/g, "$1 ")
                                                    .trim()
                                            )
                                        }
                                    />

                                    <label>Card Holder Name</label>
                                    <input
                                        type="text"
                                        placeholder="Name on card"
                                        value={cardDetails.name}
                                        onChange={(e) =>
                                            handleCardChange("name", e.target.value)
                                        }
                                    />

                                    <div className="card-small-fields">
                                        <div>
                                            <label>Expiry Date</label>
                                            <input
                                                type="text"
                                                maxLength="5"
                                                placeholder="MM/YY"
                                                value={cardDetails.expiry}
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                        .replace(/\D/g, "")
                                                        .slice(0, 4);
                                                    handleCardChange(
                                                        "expiry",
                                                        value.length > 2
                                                            ? `${value.slice(0, 2)}/${value.slice(2)}`
                                                            : value
                                                    );
                                                }}
                                            />
                                        </div>

                                        <div>
                                            <label>CVV</label>
                                            <input
                                                type="password"
                                                maxLength="4"
                                                placeholder="CVV"
                                                value={cardDetails.cvv}
                                                onChange={(e) =>
                                                    handleCardChange(
                                                        "cvv",
                                                        e.target.value.replace(/\D/g, "").slice(0, 4)
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Net Banking */}
                            {paymentMethod === "netbanking" && (
                                <div className="payment-input-section">
                                    <h3>Select Your Bank</h3>
                                    <select
                                        value={bank}
                                        onChange={(e) => setBank(e.target.value)}
                                    >
                                        <option value="">Choose bank</option>
                                        <option value="SBI">State Bank of India</option>
                                        <option value="HDFC">HDFC Bank</option>
                                        <option value="ICICI">ICICI Bank</option>
                                        <option value="Axis">Axis Bank</option>
                                        <option value="Kotak">Kotak Mahindra Bank</option>
                                    </select>
                                </div>
                            )}

                            {/* Wallet */}
                            {paymentMethod === "wallet" && (
                                <div className="payment-input-section">
                                    <h3>Select Wallet</h3>
                                    <select
                                        value={wallet}
                                        onChange={(e) => setWallet(e.target.value)}
                                    >
                                        <option value="">Choose wallet</option>
                                        <option value="Paytm">Paytm</option>
                                        <option value="Amazon Pay">Amazon Pay</option>
                                        <option value="Mobikwik">MobiKwik</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Booking Summary */}
                        <aside className="payment-summary-card">
                            <h2>Booking Summary</h2>

                            <div className="payment-route">
                                <strong>{from}</strong>
                                <span>→</span>
                                <strong>{to}</strong>
                            </div>

                            <div className="payment-summary-row">
                                <span>Bus Operator</span>
                                <strong>{bus.operator}</strong>
                            </div>

                            <div className="payment-summary-row">
                                <span>Bus Type</span>
                                <strong>{bus.busType}</strong>
                            </div>

                            <div className="payment-summary-row">
                                <span>Journey Date</span>
                                <strong>{journeyDate}</strong>
                            </div>

                            <div className="payment-summary-row">
                                <span>Selected Seats</span>
                                <strong>{selectSeat.join(", ")}</strong>
                            </div>

                            <div className="payment-summary-row">
                                <span>Passengers</span>
                                <strong>{passengers.length}</strong>
                            </div>

                            <div className="payment-summary-row">
                                <span>Contact Number</span>
                                <strong>{contact.mobile || "—"}</strong>
                            </div>

                            <div className="payment-total">
                                <span>Total Payable</span>
                                <strong>₹{amount}</strong>
                            </div>

                            <button
                                type="submit"
                                className="pay-now-btn"
                                disabled={processing}
                            >
                                {processing ? "Processing..." : `Pay ₹${amount} Now`}
                            </button>

                            <p className="payment-demo-note">
                                Demo only — no real payment will be processed.
                            </p>
                        </aside>

                    </div>
                </form>
            </div>

            {/* //popup */}
            {showConfirmation && (
                <div className="booking-popup-overlay">
                    <div className="booking-popup">
                        <div className="popup-success-icon">✓</div>

                        <h2>Booking Confirmed!</h2>

                        <p>
                            Your payment was successful and your bus ticket
                            has been confirmed.
                        </p>

                        <div className="popup-booking-id">
                            <span>Booking ID</span>
                            <strong>#{confirmedBooking?.bookingId}</strong>
                        </div>

                        <h3>₹{amount}</h3>
                        <span className="popup-paid">Payment Successful</span>

                        <button
                            onClick={() =>
                                navigate("/BookingConfirmation", {
                                    state: confirmedBooking,
                                })
                            }
                        >
                            View My Ticket
                        </button>

                    </div>
                </div>
            )}
        </div>



    );
};

export default Payment;
