
import React, { useState } from "react";
import "./AuthPopup.css";

const USERS_KEY = "busgoUsers";
const SESSION_KEY = "busgoCurrentUser";

const AuthPopup = ({ onLogin, initialTab = "login" }) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [error, setError] = useState("");

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    // LOGIN
    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

        const user = users.find(
            (item) =>
                item.email.toLowerCase() === loginData.email.toLowerCase() &&
                item.password === loginData.password
        );

        if (!user) {
            setError("Invalid email or password.");
            return;
        }

        const loggedInUser = {
            name: user.name,
            email: user.email,
            mobile: user.mobile,
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(loggedInUser));
        onLogin(loggedInUser);
    };

    // REGISTER
    const handleRegister = (e) => {
        e.preventDefault();

        const { name, email, mobile, password, confirmPassword } = registerData;

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Password and confirm password do not match.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(mobile)) {
            setError("Enter a valid 10-digit Indian mobile number.");
            return;
        }

        const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

        const alreadyExists = users.some(
            (user) => user.email.toLowerCase() === email.toLowerCase()
        );

        if (alreadyExists) {
            setError("This email is already registered. Please login.");
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            mobile,
            password,
        };

        users.push(newUser);

        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        const loggedInUser = {
            name: newUser.name,
            email: newUser.email,
            mobile: newUser.mobile,
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(loggedInUser));

        onLogin(loggedInUser);
    };

    return (
        <div className="auth-overlay">
            <div className="auth-modal">

                <div className="auth-header">
                    <h2><span>BUS</span>GO</h2>
                    <p>Your Journey, Our Priority</p>
                </div>

                <div className="auth-welcome">
                    <h3>
                        {activeTab === "login"
                            ? "Welcome Back!"
                            : "Create Your Account"}
                    </h3>

                    <p>
                        {activeTab === "login"
                            ? "Login to continue your journey."
                            : "Register with BUSGO and start booking."}
                    </p>
                </div>

                <div className="auth-tabs">
                    <button
                        className={activeTab === "login" ? "active" : ""}
                        onClick={() => {
                            setActiveTab("login");
                            setError("");
                        }}
                    >
                        Login
                    </button>

                    <button
                        className={activeTab === "register" ? "active" : ""}
                        onClick={() => {
                            setActiveTab("register");
                            setError("");
                        }}
                    >
                        Register
                    </button>
                </div>

                {error && <div className="auth-error">{error}</div>}

                {activeTab === "login" ? (
                    <form onSubmit={handleLogin} className="auth-form">

                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                        />

                        <button type="submit" className="auth-submit">
                            Login to BUSGO
                        </button>

                        <p className="auth-switch">
                            Don't have an account?
                            <button
                                type="button"
                                onClick={() => {
                                    setActiveTab("register");
                                    setError("");
                                }}
                            >
                                Register
                            </button>
                        </p>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} className="auth-form">

                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={registerData.name}
                            onChange={handleRegisterChange}
                            required
                        />

                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                            required
                        />

                        <label>Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            placeholder="10-digit mobile number"
                            maxLength="10"
                            value={registerData.mobile}
                            onChange={handleRegisterChange}
                            required
                        />

                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Create password"
                            value={registerData.password}
                            onChange={handleRegisterChange}
                            required
                        />

                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={registerData.confirmPassword}
                            onChange={handleRegisterChange}
                            required
                        />

                        <button type="submit" className="auth-submit">
                            Create Account
                        </button>

                        <p className="auth-switch">
                            Already have an account?
                            <button
                                type="button"
                                onClick={() => {
                                    setActiveTab("login");
                                    setError("");
                                }}
                            >
                                Login
                            </button>
                        </p>
                    </form>
                )}

                <div className="auth-bottom">
                    Secure your journey with BUSGO
                </div>
            </div>
        </div>
    );
};

export default AuthPopup;
