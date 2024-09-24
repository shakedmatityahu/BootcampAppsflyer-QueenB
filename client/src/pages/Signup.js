import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "./Auth.css";
import avatarImages from "../components/avatarImages";

const Signup = () => {
    const { signup, error } = useSignup();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("mentee");
    const [selectedAvatar, setSelectedAvatar] = useState(""); // Avatar state
    const [showAvatarModal, setShowAvatarModal] = useState(false); // Modal state
    const ALLOWED_LANGUAGES = [
        "C++",
        "C#",
        "GoLang",
        "Java",
        "JavaScript",
        "PHP",
        "Python",
        "Ruby",
        "TypeScript",
    ];

    // Mentor-specific fields
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [selectedLanguages, setSelectedLanguages] = useState([]); // Store selected languages

    const [showMentorFields, setShowMentorFields] = useState(false);

    const handleSignupBtn = async (e) => {
        e.preventDefault();
        await signup(
            email,
            password,
            userType,
            first_name,
            last_name,
            phone_number,
            linkedin,
            selectedLanguages,
            selectedAvatar
        );
    };

    const handleUserTypeAccount = (e) => {
        setUserType(e.target.value);
        setShowMentorFields(e.target.value === "mentor");
    };

    const handleLanguageChange = (e) => {
        const value = e.target.value;
        if (value && !selectedLanguages.includes(value)) {
            setSelectedLanguages([...selectedLanguages, value]);
        }
    };

    const removeLanguage = (index) => {
        const newLanguagesArray = selectedLanguages.filter((_, i) => i !== index);
        setSelectedLanguages(newLanguagesArray);
    };

    const handleAvatarSelection = () => {
        setShowAvatarModal(false);
    };

    return (
        <section>
            <div className="auth-container">
                <h2>Signup</h2>
                <p>
                    Already have an account? <a href="/login">Login</a>
                </p>
                <form>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="name@example.com"
                    />

                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"
                    />

                    <div className="radio-group">
                        <p>Choose your account</p>
                        <label>
                            <input
                                type="radio"
                                name="account"
                                value="mentee"
                                checked={userType === "mentee"}
                                onChange={handleUserTypeAccount}
                            />
                            Mentee
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="account"
                                value="mentor"
                                checked={userType === "mentor"}
                                onChange={handleUserTypeAccount}
                            />
                            Mentor
                        </label>
                    </div>

                    {showMentorFields && (
                        <div className="mentor-fields">
                            <input
                                onChange={(e) => setFirstName(e.target.value)}
                                value={first_name}
                                placeholder="First Name"
                            />
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                                value={last_name}
                                placeholder="Last Name"
                            />
                            <input
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phone_number}
                                placeholder="Phone Number"
                            />
                            <input
                                onChange={(e) => setLinkedin(e.target.value)}
                                value={linkedin}
                                placeholder="Linkedin URL"
                            />
                            <div>
                                <select onChange={handleLanguageChange}>
                                    <option value="">Select Programming Languages</option>
                                    {ALLOWED_LANGUAGES.map((language, index) => (
                                        <option key={index} value={language}>
                                            {language}
                                        </option>
                                    ))}
                                </select>
                                <div className="programming-languages-container">
                                    {selectedLanguages.map((language, index) => (
                                        <span key={index} className="language-tag">
                                            {language}
                                            <button
                                                type="button"
                                                onClick={() => removeLanguage(index)}
                                            >
                                                <svg
                                                    width="15px"
                                                    height="15px"
                                                    viewBox="0 0 24 24"
                                                    fill="ea4c89"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M10.9393 12L6.9696 15.9697L8.03026 17.0304L12 13.0607L15.9697 17.0304L17.0304 15.9697L13.0607 12L17.0303 8.03039L15.9696 6.96973L12 10.9393L8.03038 6.96973L6.96972 8.03039L10.9393 12Z"
                                                        fill="#080341"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        {/* Avatar selection button */}
                        <button type="button" onClick={() => setShowAvatarModal(true)}>
                            Select Avatar
                        </button>
                        {selectedAvatar && (
                            <p>
                                Selected Avatar:{" "}
                                <img
                                    src={require(`../images/${selectedAvatar}`)}
                                    alt="Selected Avatar"
                                    width="50px"
                                    height="50px"
                                />
                            </p>
                        )}
                    </div>

                    {showAvatarModal && (
                        <div className="avatar-modal">
                            <h2>Select your Avatar</h2>
                            <div className="avatar-options">
                                {avatarImages.map((avatar, index) => (
                                    <img
                                        key={index}
                                        src={require(`../images/${avatar}`)}
                                        alt={`avatar-${index}`}
                                        onClick={() => setSelectedAvatar(avatar)}
                                        className={selectedAvatar === avatar ? "selected" : ""}
                                        width="100px"
                                        height="100px"
                                    />
                                ))}
                            </div>
                            <button onClick={handleAvatarSelection}>Choose</button>
                        </div>
                    )}

                    {error && <p className="error-message">{error}</p>}

                    <button onClick={handleSignupBtn}>Sign up</button>
                </form>
            </div>
        </section>
    );
};

export default Signup;
