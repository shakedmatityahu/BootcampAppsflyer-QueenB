import React, { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import "./Auth.css";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useAuthContext();


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/getMessages/${user.email}`);
        const data = await response.json();
        if (response.ok) {
          setMessages(data);
        }
        else {
          console.log(data.error);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (user) fetchMessages();
  }, [user]);

  const handleDeleteMessage = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/deleteMessage/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      
      const data = await response.json();
      if (response.ok) {
        const updateMessages = messages.filter((message)=>message.message_id !== id);
        setMessages(updateMessages);
      }
      else {
        console.log(data.error);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <section>
      <div>
        {messages.map((message) => (
          <div className="message">
            <button onClick={() => handleDeleteMessage(message.message_id)}>
              <div className="message-delete">
                <svg
                  width="18px"
                  height="18px"
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
              </div>
            </button>
            <h6> {message.sender} <a
              className="link-opacity-10-hover"
              href={`mailto:${message.sender}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="22px"
                height="25px"
                viewBox="-0.5 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.0098 12.39V7.39001C22.0098 6.32915 21.5883 5.31167 20.8382 4.56152C20.0881 3.81138 19.0706 3.39001 18.0098 3.39001H6.00977C4.9489 3.39001 3.93148 3.81138 3.18134 4.56152C2.43119 5.31167 2.00977 6.32915 2.00977 7.39001V17.39C2.00977 18.4509 2.43119 19.4682 3.18134 20.2184C3.93148 20.9685 4.9489 21.39 6.00977 21.39H12.0098"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21.209 5.41992C15.599 16.0599 8.39906 16.0499 2.78906 5.41992"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.0098 18.39H23.0098"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.0098 15.39L23.0098 18.39L20.0098 21.39"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>{" "}
            </a></h6>
            <p>{message.message}</p>
          </div>

        ))}
      </div>
    </section>
  );
};

export default Message;
