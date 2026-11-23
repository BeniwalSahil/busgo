
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Accounts.css";

const Account = () => {
    const navigate = useNavigate();
    const [searchBooking, setSearchBooking] = useState("");

    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem("busgoCurrentUser") || "null")
    );

    const [activeTab, setActiveTab] = useState("profile");
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        mobile: user?.mobile || "",
    });

    const bookings = JSON.parse(
        localStorage.getItem("busgoBookings") || "[]"
    ).filter(
        booking =>
            booking.userEmail?.toLowerCase() === user?.email?.toLowerCase()
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();

        const updatedUser = {
            ...user,
            name: formData.name,
            mobile: formData.mobile,
        };

        // Update current login session
        localStorage.setItem(
            "busgoCurrentUser",
            JSON.stringify(updatedUser)
        );

        // Update registered users list
        const users = JSON.parse(
            localStorage.getItem("busgoUsers") || "[]"
        );

        const updatedUsers = users.map(item =>
            item.email.toLowerCase() === user.email.toLowerCase()
                ? { ...item, name: formData.name, mobile: formData.mobile }
                : item
        );

        localStorage.setItem("busgoUsers", JSON.stringify(updatedUsers));

        setUser(updatedUser);
        setIsEditing(false);
        alert("Profile updated successfully!");
    };

    const handleLogout = () => {
        localStorage.removeItem("busgoCurrentUser");
        navigate("/");
        window.location.reload();
    };

    if (!user) {
        return (
            <div className="account-login-message">
                <h2>Please Login First</h2>
                <button onClick={() => navigate("/")}>Go to Home</button>
            </div>
        );
    }

    const handleCancelBooking = (bookingId) => {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this ticket?"
        );

        if (!confirmCancel) return;

        const allBookings = JSON.parse(
            localStorage.getItem("busgoBookings") || "[]"
        );

        const updatedBookings = allBookings.map((item) =>
            item.bookingId === bookingId
                ? { ...item, bookingStatus: "Cancelled" }
                : item
        );

        localStorage.setItem(
            "busgoBookings",
            JSON.stringify(updatedBookings)
        );

        window.location.reload();
    };

    const filteredBookings = bookings.filter((booking) =>
        booking.bookingId?.toLowerCase().includes(searchBooking.toLowerCase().trim())
    );

    return (
        <div className="account-container">
            <aside className="account-sidebar">
                <h2>My Account</h2>

                <div className="account-user">
                    <div className="user-avatar">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>

                <button onClick={() => setActiveTab("profile")}>
                    My Profile
                </button>

                <button onClick={() => setActiveTab("bookings")}>
                    My Bookings ({bookings.length})
                </button>

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </aside>

            <main className="account-content">

                {/* PROFILE SECTION */}
                {activeTab === "profile" && (
                    <section>
                        <h2>My Profile</h2>
                        <p>Manage your personal information.</p>

                        {isEditing ? (
                            <form onSubmit={handleUpdateProfile}>
                                <div className="profile-form">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />

                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        value={user.email}
                                        disabled
                                    />

                                    <label>Mobile Number</label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        pattern="[6-9][0-9]{9}"
                                        maxLength="10"
                                        required
                                    />
                                </div>

                                <button type="submit" className="account-primary-btn">
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    className="account-secondary-btn"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <>
                                <div className="profile-details">
                                    <div>
                                        <label>Full Name</label>
                                        <p>{user.name}</p>
                                    </div>

                                    <div>
                                        <label>Email Address</label>
                                        <p>{user.email}</p>
                                    </div>

                                    <div>
                                        <label>Mobile Number</label>
                                        <p>{user.mobile}</p>
                                    </div>
                                </div>

                                <button
                                    className="account-primary-btn"
                                    onClick={() => {
                                        setFormData({
                                            name: user.name || "",
                                            mobile: user.mobile || "",
                                        });
                                        setIsEditing(true);
                                    }}
                                >
                                    Edit Profile
                                </button>
                            </>
                        )}
                    </section>
                )}

                {/* BOOKINGS SECTION */}
                {activeTab === "bookings" && (
                    <section>
                        <h2>My Bookings</h2>
                        <div className="booking-search">
                            <input type="text" placeholder="Search by Booking ID..." value={searchBooking} onChange={(e) => setSearchBooking(e.target.value)} />
                            <button onClick={() => setSearchBooking("")}>Clear</button>
                        </div>
                        <p>Your bus ticket booking history.</p>

                        {bookings.length === 0 ? (
                            <div className="empty-bookings">
                                <h3>No Bookings Found</h3>
                                <p>You haven't booked any bus tickets yet.</p>
                                <button onClick={() => navigate("/")}>
                                    Book Your Bus
                                </button>
                            </div>
                        ) : (
                            <div className="my-bookings-list">
                                {filteredBookings.length === 0 ? (
                                    <div className="empty-bookings">
                                        <h3>No Booking Found</h3>
                                        <p>Please check your Booking ID and try again.</p>
                                    </div>
                                ) : (
                                    <div className="my-bookings-list">
                                        {
                                            filteredBookings.slice().reverse().map((booking) => (
                                                <div className="my-booking-card" key={booking.bookingId}>
                                                    <div className="booking-card-header">
                                                        <h3>{booking.bus?.operator}</h3>
                                                        <span>{booking.paymentStatus}</span>
                                                        <span
                                                            className={
                                                                booking.bookingStatus === "Cancelled"
                                                                    ? "status-cancelled"
                                                                    : "status-confirmed"
                                                            }
                                                        >
                                                            {booking.bookingStatus || "Confirmed"}
                                                        </span>
                                                    </div>

                                                    <div className="booking-route">
                                                        <div>
                                                            <h3>{booking.from}</h3>
                                                            <small>From</small>
                                                        </div>

                                                        <span>→</span>

                                                        <div>
                                                            <h3>{booking.to}</h3>
                                                            <small>To</small>
                                                        </div>
                                                    </div>

                                                    <div className="booking-card-info">
                                                        <p>
                                                            <strong>Booking ID:</strong> {booking.bookingId}
                                                        </p>
                                                        <p>
                                                            <strong>Date:</strong> {booking.journeyDate}
                                                        </p>
                                                        <p>
                                                            <strong>Seats:</strong>{" "}
                                                            {booking.selectSeat?.join(", ")}
                                                        </p>
                                                        <p>
                                                            <strong>Amount:</strong> ₹{booking.totalAmount}
                                                        </p>
                                                    </div>

                                                    <button
                                                        className="account-primary-btn"
                                                        onClick={() =>
                                                            navigate("/BookingConfirmation", {
                                                                state: booking,
                                                            })
                                                        }
                                                    >
                                                        View Ticket
                                                    </button>
                                                    {/* Cancel Ticket Button */}
                                                    {booking.bookingStatus !== "Cancelled" && (
                                                        <button
                                                            className="cancel-ticket-btn"
                                                            onClick={() => handleCancelBooking(booking.bookingId)}
                                                        >
                                                            Cancel Ticket
                                                        </button>
                                                    )}

                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
};

export default Account;
