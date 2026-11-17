
import React, { useState } from "react";
import "./Rewards.css";
import { FaStar } from "react-icons/fa6";

const Rewards = () => {

    const [completedTrips] = useState(1);
    const totalTrips = 4;

    const remainingTrips = totalTrips - completedTrips;

    return (
        <section className="trip-reward-section">

            <h2 className="trip-reward-title">
                My tripReward
            </h2>

            <div className="trip-reward-banner">

                {/* Branding */}
                <div className="trip-reward-brand">
                    <div className="trip-reward-logo">
                        <FaStar />
                    </div>

                    <h3>BUSGO<span>Reward</span></h3>
                </div>

                {/* Trip Progress */}
                <div className="trip-progress">

                    <h2>BUSGO</h2>

                    <div className="trip-milestones">

                        {Array.from({ length: totalTrips }, (_, index) => {

                            const completed = index < completedTrips;

                            return (
                                <div
                                    key={index}
                                    className={`trip-hexagon ${completed ? "active" : ""
                                        }`}
                                >
                                    {index + 1}
                                </div>
                            );
                        })}

                    </div>

                </div>

                {/* Reward Message */}
                <p className="trip-reward-message">
                    Take <strong>{remainingTrips} more trips</strong>
                    {" "}before 06 Feb 2027 &{" "}
                    <strong>get a free ticket!</strong>
                </p>

                {/* Progress Footer */}
                <div className="trip-reward-footer">
                    <span>
                        <FaStar /> {completedTrips}/{totalTrips} Trips Completed
                    </span>

                    <span>
                        {Math.round((completedTrips / totalTrips) * 100)}% Completed
                    </span>
                </div>

            </div>

        </section>
    );
};

export default Rewards;
