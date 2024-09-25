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
        else{
            console.log(data.error);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (user) fetchMessages();
}, [user]);



  return (
    <section>
      <div>
        {messages.map((message) => (
         <div className="message">
         <h6> {message.sender}</h6>
         <p>{message.message}</p>
       </div>
       
        ))}
      </div>
    </section>
  );
};

export default Message;
