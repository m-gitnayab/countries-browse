import React from "react";
export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <i className="fa-solid fa-magnifying-glass" />
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
