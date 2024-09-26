import React, { useContext } from 'react';
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import "./WelcomePage.css";
import { AuthContext } from '../context/AuthContext';


const WelcomePage = () => {
    const { user: currentUser } = useContext(AuthContext);

    return (
        <>
            <div className="welcome-container">
                <header className="welcome-header">
                    <p className="upper-subtitle">We are here to help!</p>
                    <h1 className="welcome-title">
                        Where women in tech come <br />
                        to learn and connect
                    </h1>
                    <p className="welcome-subtitle">
                        Join a community of like-minded women in tech, find mentors, and
                        grow your skills together.
                    </p>
                    {currentUser ? (
                        <>
                            <Link to="/MentorsBrowse" className="welcome-button">
                                Get Started
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="welcome-button">
                                Get Started
                            </Link>
                        </>
                    )}
                </header>
            </div>
            <Carousel />
        </>
    );
};

export default WelcomePage;
