
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import "./Buslist.css";

const busData = [
    {
        id: 1,
        operator: "IntrCity SmartBus",
        busType: "AC Sleeper (2+1)",
        departure: "21:30",
        arrival: "06:00",
        duration: "8h 30m",
        from: "Delhi",
        to: "Agra",
        price: 699,
        rating: 4.6,
        reviews: 1250,
        seats: 12,
        ac: true,
        sleeper: true,
        amenities: ["WiFi", "Charging Point", "Water Bottle"],
    },
    {
        id: 2,
        operator: "Zingbus Plus",
        busType: "AC Seater/Sleeper",
        departure: "22:15",
        arrival: "07:00",
        duration: "8h 45m",
        from: "Delhi",
        to: "Jaipur",
        price: 799,
        rating: 4.8,
        reviews: 980,
        seats: 8,
        ac: true,
        sleeper: true,
        amenities: ["Charging Point", "Blanket", "Live Tracking"],
    },
    {
        id: 3,
        operator: "Shree Mahaveer Travels",
        busType: "Non AC Sleeper",
        departure: "20:00",
        arrival: "05:30",
        duration: "9h 30m",
        from: "Delhi",
        to: "Mumbai",
        price: 499,
        rating: 4.2,
        reviews: 640,
        seats: 18,
        ac: false,
        sleeper: true,
        amenities: ["Water Bottle", "Reading Light"],
    },
    {
        id: 4,
        operator: "Rajasthan Travels",
        busType: "AC Seater (2+2)",
        departure: "07:00",
        arrival: "12:30",
        duration: "5h 30m",
        from: "Delhi",
        to: "Jaipur",
        price: 599,
        rating: 4.3,
        reviews: 430,
        seats: 20,
        ac: true,
        sleeper: false,
        amenities: ["Charging Point", "Water Bottle"],
    },
];

const Buslisting = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchParams] = useSearchParams();

    const from = searchParams.get("from") || "Delhi";
    const to = searchParams.get("to") || "Jaipur";
    const journeyDate = searchParams.get("date") || "";

    const [editFrom, setEditFrom] = useState(from);
    const [editTo, setEditTo] = useState(to);
    const [editDate, setEditDate] = useState(journeyDate);

    console.log("From:", from);
    console.log("To:", to);
    console.log("Date:", journeyDate);
    // Read search details sent from the Home page
    // const searchData = location.state || {};

    const [busType, setBusType] = useState("All");
    const [sortBy, setSortBy] = useState("recommended");
    const [maxPrice, setMaxPrice] = useState(2000);

    // const from = searchData.from || "Delhi";
    // const to = searchData.to || "Jaipur";
    // const journeyDate = searchData.date || "18 Nov 2026";

    const handleModifySearch = (e) => {
        e.preventDefault();

        if (!editFrom.trim() || !editTo.trim()) {
            alert("Please enter both cities");
            return;
        }

        if (editFrom.trim().toLowerCase() === editTo.trim().toLowerCase()) {
            alert("Source and destination cannot be same");
            return;
        }

        if (!editDate) {
            alert("Please select journey date");
            return;
        }

        navigate(
            `/Buslisting?from=${encodeURIComponent(editFrom.trim())}&to=${encodeURIComponent(editTo.trim())}&date=${editDate}`
        );
    };

    const filteredBuses = useMemo(() => {
        console.log("Searching:", from, "to", to);

        let result = busData.filter((bus) => {
            const routeMatch =
                bus.from.trim().toLowerCase() === from.trim().toLowerCase() &&
                bus.to.trim().toLowerCase() === to.trim().toLowerCase();

            const typeMatch =
                busType === "All" ||
                (busType === "AC" && bus.ac) ||
                (busType === "Non AC" && !bus.ac) ||
                (busType === "Sleeper" && bus.sleeper) ||
                (busType === "Seater" && !bus.sleeper);

            return routeMatch && typeMatch && bus.price <= maxPrice;
        });

        if (sortBy === "price") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "departure") {
            result.sort((a, b) => a.departure.localeCompare(b.departure));
        } else if (sortBy === "rating") {
            result.sort((a, b) => b.rating - a.rating);
        }

        console.log("Matching buses:", result);

        return result;
    }, [from, to, busType, sortBy, maxPrice]);


    const handleViewSeats = (bus) => {
        navigate("/SelectSeat", {
            state: {
                bus,
                from,
                to,
                journeyDate,
            },
        });
    };

    return (

        <div className="bus-listing-page">

            {/* Search Summary */}
            <div className="listing-search-bar">
                <div className="listing-route">
                    <div>
                        <small>FROM</small>
                        <h3>{from}</h3>
                    </div>

                    <span className="route-arrow">→</span>

                    <div>
                        <small>TO</small>
                        <h3>{to}</h3>
                    </div>

                    <div className="listing-date">
                        <small>JOURNEY DATE</small>
                        <h3>{journeyDate}</h3>
                    </div>
                </div>
                <form className="modify-search-form" onSubmit={handleModifySearch}>
                    <input
                        type="text"
                        value={editFrom}
                        onChange={(e) => setEditFrom(e.target.value)}
                        placeholder="From city"
                    />

                    <input
                        type="text"
                        value={editTo}
                        onChange={(e) => setEditTo(e.target.value)}
                        placeholder="To city"
                    />

                    <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                    />

                    <button type="submit">Search Buses</button>
                </form>
                {/* <button
                    className="modify-search-btn"
                    onClick={() => navigate("/")}
                >
                    Modify Search
                </button> */}
            </div>

            {/* Page Heading */}
            <div className="listing-heading">
                <div>
                    <h2>
                        Buses from {from} to {to}
                    </h2>
                    <p>{filteredBuses.length} buses found for your journey</p>
                </div>
            </div>

            <div className="listing-layout">

                {/* Filter Sidebar */}
                <aside className="listing-filters">
                    <div className="filter-heading">
                        <h3>Filters</h3>
                        <button
                            onClick={() => {
                                setBusType("All");
                                setMaxPrice(2000);
                            }}
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="filter-group">
                        <h4>Bus Type</h4>

                        {["All", "AC", "Non AC", "Sleeper", "Seater"].map((type) => (
                            <label className="filter-option" key={type}>
                                <input
                                    type="radio"
                                    name="busType"
                                    checked={busType === type}
                                    onChange={() => setBusType(type)}
                                />
                                <span>{type === "All" ? "All Buses" : type}</span>
                            </label>
                        ))}
                    </div>

                    <div className="filter-group">
                        <h4>Price Range</h4>
                        <div className="price-range-label">
                            <span>₹0</span>
                            <strong>₹{maxPrice}</strong>
                        </div>

                        <input
                            type="range"
                            min="500"
                            max="2000"
                            step="100"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                        />
                    </div>
                </aside>

                {/* Bus Results */}
                <main className="listing-results">

                    {/* Sorting */}
                    <div className="listing-sort-bar">
                        <h3>Available Buses</h3>

                        <div className="sort-options">
                            <span>Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="recommended">Recommended</option>
                                <option value="price">Lowest Price</option>
                                <option value="departure">Departure</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>
                    </div>

                    {/* Bus Cards */}
                    {filteredBuses.length > 0 ? (
                        filteredBuses.map((bus) => (
                            <div className="bus-card" key={bus.id}>

                                <div className="bus-card-top">
                                    <div className="bus-operator">
                                        <div className="bus-logo">B</div>
                                        <div>
                                            <h3>{bus.operator}</h3>
                                            <p>{bus.busType}</p>
                                        </div>
                                    </div>

                                    <div className="bus-rating">
                                        <span>★ {bus.rating}</span>
                                        <small>{bus.reviews} reviews</small>
                                    </div>
                                </div>

                                <div className="bus-timing-row">
                                    <div>
                                        <h2>{bus.departure}</h2>
                                        <p>{from}</p>
                                    </div>

                                    <div className="bus-duration">
                                        <span>{bus.duration}</span>
                                        <div className="duration-line"></div>
                                        <small>Direct Journey</small>
                                    </div>

                                    <div>
                                        <h2>{bus.arrival}</h2>
                                        <p>{to}</p>
                                    </div>

                                    <div className="bus-price">
                                        <h2>₹{bus.price}</h2>
                                        <small>Starting from</small>
                                    </div>
                                </div>

                                <div className="bus-card-bottom">
                                    <div className="bus-amenities">
                                        {bus.amenities.map((item) => (
                                            <span key={item}>{item}</span>
                                        ))}
                                    </div>

                                    <div className="bus-seat-action">
                                        <small>{bus.seats} seats available</small>
                                        <button onClick={() => handleViewSeats(bus)}>
                                            View Seats
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="no-buses-found">
                            <h3>No buses found</h3>
                            <p>Try changing your filters to see more buses.</p>
                            <button
                                onClick={() => {
                                    setBusType("All");
                                    setMaxPrice(2000);
                                }}
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Buslisting;
