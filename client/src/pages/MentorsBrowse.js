import React, { useState } from "react";
import MentorsDetails from "../components/MentorsDetails";
import './Auth.css'; 

const MentorsBrowse = () => {
  const [searchTerm, setSearchTerm] = useState(""); 

  return (
    <section className="home-subtitle">
      <input
        type="text"
        placeholder="Search for mentors..."
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
      />
      <MentorsDetails searchTerm={searchTerm} />
    </section>
  );
};

export default MentorsBrowse;