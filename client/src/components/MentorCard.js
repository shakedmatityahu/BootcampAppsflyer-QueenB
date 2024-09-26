import React, { useState } from "react";
import avatarImages from "./avatarImages";
import { useAuthContext } from "../hooks/useAuthContext";
import "./MentorCard.css"; // Import custom styles for the card

const MentorCard = ({ mentor }) => {
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");
  const image_src = avatarImages[mentor.photo[6] - 1];

  const sendMessage = async () => {
    const response = await fetch(
      `http://localhost:5001/api/sendMessage/${mentor.email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sender: user.email, message }),
      }
    );

    if (response.ok) {
      alert("Message sent successfully");
      setMessage("");
    }
  };

  return (
    <>
      <div
        className="mentor-card"
        style={{ width: "16rem", position: "relative" }}
      >
        <button
          type="button"
          className="mentor-card-button btn"
          data-bs-toggle="modal"
          data-bs-target={`#mentorModal${mentor.email}`}
        >
          <img src={image_src} alt="" className="card-image" />
          <div className="card-title">
            {mentor.first_name} {mentor.last_name}
            <p className="card-desc">
              {mentor.programming_languages
                .split(", ")
                .map((language, index) => (
                  <span key={index} className="language-tag">
                    {language}
                  </span>
                ))}
            </p>
          </div>
        </button>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id={`mentorModal${mentor.email}`}
        tabIndex="-1"
        aria-labelledby={`mentorModalLabel${mentor.id}`}
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-5"
                id={`mentorModalLabel${mentor.id}`}
              >
                {mentor.first_name} {mentor.last_name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-body-right">
                <div className="modal-languages">
                  {mentor.programming_languages
                    .split(", ")
                    .map((language, index) => (
                      <span key={index} className="mentor-card-language-tag">
                        {language}
                      </span>
                    ))}
                </div>
                <div className="modal-about">{mentor.about_me}</div>{" "}
                <div className="modal-msgs">
                  <textarea
                    type="text"
                    className="messages-bar"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Send a message to ${mentor.first_name}`}
                  />
                  <button onClick={(e) => sendMessage()}>
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="modal-body-left">
                <img src={image_src} alt="" className="card-image" />
              </div>
            </div>
            <div className="modal-footer">
              <a
                className="link-opacity-10-hover"
                href={mentor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="22px"
                  height="22px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z"
                    fill="#0F0F0F"
                  />
                  <path
                    d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z"
                    fill="#0F0F0F"
                  />
                  <path
                    d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z"
                    fill="#0F0F0F"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z"
                    fill="#0F0F0F"
                  />
                </svg>
              </a>
              <a
                className="link-opacity-10-hover"
                href={`mailto:${mentor.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="22px"
                  height="25px"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.0098 12.39V7.39001C22.0098 6.32915 21.5883 5.31167 20.8382 4.56152C20.0881 3.81138 19.0706 3.39001 18.0098 3.39001H6.00977C4.9489 3.39001 3.93148 3.81138 3.18134 4.56152C2.43119 5.31167 2.00977 6.32915 2.00977 7.39001V17.39C2.00977 18.4509 2.43119 19.4682 3.18134 20.2184C3.93148 20.9685 4.9489 21.39 6.00977 21.39H12.0098"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21.209 5.41992C15.599 16.0599 8.39906 16.0499 2.78906 5.41992"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.0098 18.39H23.0098"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.0098 15.39L23.0098 18.39L20.0098 21.39"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>{" "}
              </a>
              <a
                className="link-opacity-10-hover"
                href={`http://wa.me/+972${mentor.phone_number}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                    fill="#0F0F0F"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                    fill="#0F0F0F"
                  />
                </svg>{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorCard;
