
import React from "react";
import "./Footer.css";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaBus,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="busgo-footer">

            <div className="footer-container">

                {/* Brand Section */}
                <div className="footer-brand">
                    <h2>
                        <FaBus /> BUS<span>GO</span>
                    </h2>

                    <p>
                        Your journey, our responsibility. Book bus tickets
                        easily and travel comfortably with BUSGO.
                    </p>

                    <div className="footer-social">
                        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Company Links */}
                <div className="footer-column">
                    <h3>Company</h3>
                    <a href="#">About Us</a>
                    <a href="#">Contact Us</a>
                    <a href="#">Careers</a>
                    <a href="#">Blog</a>
                    <a href="#">Offers</a>
                </div>

                {/* Information Links */}
                <div className="footer-column">
                    <h3>Information</h3>
                    <a href="#">Bus Routes</a>
                    <a href="#">Popular Cities</a>
                    <a href="#">Bus Operators</a>
                    <a href="#">Travel Guide</a>
                    <a href="#">FAQs</a>
                </div>

                {/* Support Links */}
                <div className="footer-column">
                    <h3>Support</h3>
                    <a href="#">Help Center</a>
                    <a href="#">Manage Booking</a>
                    <a href="#">Cancellation Policy</a>
                    <a href="#">Refund Status</a>
                    <a href="#">Customer Support</a>
                </div>

                {/* Contact Section */}
                <div className="footer-column footer-contact">
                    <h3>Get In Touch</h3>

                    <p>
                        <FaPhoneAlt />
                        <span>+91 9799730400</span>
                    </p>

                    <p>
                        <FaEnvelope />
                        <span>support@busgo.com</span>
                    </p>

                    <p>
                        <FaMapMarkerAlt />
                        <span>Gurgoan (Haryana)</span>
                    </p>
                </div>

            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} BUSGO. All Rights Reserved.</p>

                <div className="footer-bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms & Conditions</a>
                    <a href="#">Cookie Policy</a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
