import React, { useEffect, useState } from "react";
import MentorCard from "./MentorCard";

import './MentorsDetails.css'; // Import custom styles for the grid



let imageIndex = 0;

const MentorsDetails = ({ searchTerm }) => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/mentors");
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  // Filter mentors based on the search term
  const filteredMentors = mentors.filter(mentor => {
    const fullName = `${mentor.first_name} ${mentor.last_name}`.toLowerCase();
    const email = mentor.email.toLowerCase();
    const phone = mentor.phone_number;
    const programmingLanguages = mentor.programming_languages.toLowerCase();

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm) ||
      programmingLanguages.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="mentors-container">
      <h2 className="mentors-title">Take a look at our amazing mentors</h2>
      <div className="card-container">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <MentorCard key={mentor.email} mentor={mentor} image_index={imageIndex++} />
            
          ))
        ) : (
          <p>No mentors found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default MentorsDetails;
