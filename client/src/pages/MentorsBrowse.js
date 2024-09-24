import React, { useState } from "react";
import MentorsDetails from "../components/MentorsDetails";
import "./Auth.css";
import { alignPropType } from "react-bootstrap/esm/types";

const MentorsBrowse = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="navbar-search-container mb-3" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="search-icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-4.35-4.35m1.35-6.65a7.5 7.5 0 1 0-15 0 7.5 7.5 0 0 0 15 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
          />
      </div>
      <MentorsDetails searchTerm={searchTerm} />
    </>
  );
};

export default MentorsBrowse;
