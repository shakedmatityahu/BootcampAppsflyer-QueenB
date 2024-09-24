import React, { useEffect, useState } from "react";
import MentorCard from "./MentorCard";

import './MentorsDetails.css'; // Import custom styles for the grid



let imageIndex = 0;

const MentorsDetails = ({ searchTerm }) => {
  const [mentors, setMentors] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  // Function to fetch mentors based on search term or fetch all if empty
  const fetchMentors = async (query = "") => {
    try {
      const url = query
        ? `http://localhost:5001/api/searchMentors/${query}`
        : "http://localhost:5001/api/mentors";
  
      console.log("Fetching from:", url);  // Debug the API endpoint
  
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await response.json();
      console.log("Fetched mentors:", data);  // Check the response
  
      if (response.ok) {
        setMentors(data);
      } else {
        console.error("Failed to fetch mentors");
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };
  

  useEffect(() => {
    // Fetch all mentors initially
    fetchMentors();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchWord(searchValue);
  
    // Avoid making an API call if search value is empty
    if (searchValue.trim()) {
      fetchMentors(searchValue);
    } else {
      fetchMentors(""); // Fetch all mentors when search is cleared
    }
  };
  

  return (
    <div className="mentors-container">
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
