import React, { useEffect, useState } from "react";
import MentorCard from "./MentorCard";
import './MentorsDetails.css'; // Import custom styles for the grid

const MentorsDetails = ({ searchTerm }) => {
  const [mentors, setMentors] = useState([]);
  const [filterMentors, setFilterMentors] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/mentors");
        const data = await response.json();
        setMentors(data);
        setFilterMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  const handleSearch = async (event) => {
    if (event.key === 'Enter') {
      if(searchWord.trim() == "") {
        setFilterMentors(mentors);
        return;
      }

      const response = await fetch(`http://localhost:5001/api/searchMentors/${searchWord}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
      const json = await response.json()

      if (response.ok) {
        setFilterMentors(json)
      }
    }
};
  // Filter mentors based on the search term
//   const filteredMentors = mentors.filter(mentor => {
//     const fullName = `${mentor.first_name} ${mentor.last_name}`.toLowerCase();
//     const email = mentor.email.toLowerCase();
//     const phone = mentor.phone_number;
//     const programmingLanguages = mentor.programming_languages.toLowerCase();

//     return (
//       fullName.includes(searchTerm.toLowerCase()) ||
//       email.includes(searchTerm.toLowerCase()) ||
//       phone.includes(searchTerm) ||
//       programmingLanguages.includes(searchTerm.toLowerCase())
//     );
//   });

  return (
    <div className="mentors-container">
      <h2 className="mentors-title">Take a look at our amazing mentors</h2>
      
      <div className="navbar-search-container mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="search-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35m1.35-6.65a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0z" />
          </svg>
          <input
              type="text"
              placeholder="Search"
              className="search-bar"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyDown={handleSearch}
          />
      </div>

      <div className="card-container">
        { filterMentors.length === 0 && 
          <div>No mentors founds.</div>
        }

        { filterMentors.map((mentor) => (
          <MentorCard key={mentor.email} mentor={mentor} />
        ))}
//         {filteredMentors.length > 0 ? (
//           filteredMentors.map((mentor) => (
//             <MentorCard key={mentor.email} mentor={mentor} />
//           ))
//         ) : (
//           <p>No mentors found matching your search.</p>
//         )}
      </div>
    </div>
  );
};

export default MentorsDetails;
