import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/search.css'

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/cars?search=${searchTerm.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Search for a car..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchComponent;















// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "../styles/search.css";

// const SearchComponent = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   // Handle search input change
//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value); // Update the search term
//   };

//   // Handle pressing "Enter" to search
//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter' && searchTerm.trim()) {
//       event.preventDefault(); // Prevent default form submission
//       console.log("Searching for:", searchTerm); // Debugging line
//       // Trigger the search manually
//       axios
//         .get(`http://127.0.0.1:5000/api/v1/cars/search`, {
//           params: { make: searchTerm }  // Ensure this matches your backend logic
//         })
//         .then((response) => {
//           console.log("Response data:", response.data); // Debugging line
//           if (response.data.cars) {
//             navigate('/car-results', { state: { cars: response.data.cars } });
//           } else {
//             console.error("No cars found in response."); // Debugging line
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching cars:", error); // Debugging line
//         });
//     }
//   };

//   return (
//     <div className="search-container">
//       <input
//         type="text"
//         placeholder="Search by make, model, or year..."
//         value={searchTerm} // The single search term
//         onChange={handleInputChange} // Handle input change
//         onKeyDown={handleKeyDown} // Handle key down events
//         className="search-input"
//       />
//     </div>
//   );
// };

// export default SearchComponent;
