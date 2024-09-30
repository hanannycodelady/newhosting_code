import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import ContactInquiry from "../components/contact_inquiry";
import "../components/car.css";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedCarId, setExpandedCarId] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Declare isLoggedIn state
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 4;

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    // Check if user is logged in by verifying the presence of a token
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); // Separate useEffect for login check

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}http://127.0.0.1:5000/api/v1/cars/all`);
        if (response.data && response.data.cars) {
          setCars(response.data.cars);
        } else {
          setError("No cars found");
        }
      } catch (err) {
        setError("Failed to fetch cars: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []); // Separate useEffect for fetching cars

  const toggleCarDetails = (carId) => {
    setExpandedCarId(expandedCarId === carId ? null : carId);
  };

  const toggleInquiryForm = (carId) => {
    if (!isLoggedIn) {
      // Redirect to login if user is not logged in
      navigate("/login");
    } else {
      setSelectedCarId(selectedCarId === carId ? null : carId);
    }
  };

  const filteredCars = cars.filter(
    (car) =>
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  const currentCars = filteredCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="car-list">
      {currentCars.map((car) => (
        <div key={car.id} className="car-card">
          <img
            src={car.images[0] || "default-image-path.jpg"}
            alt={`${car.make} ${car.model}`}
            className="car-image"
          />
          <div className="car-details">
            <h3 className="car-title">
              {car.year} {car.make} {car.model}
            </h3>
            <div className="car-price">${car.price}</div>

            {expandedCarId === car.id && (
              <table className="car-specs-table">
                <tbody>
                  <tr>
                    <td>Mileage:</td>
                    <td>{car.mileage?.toLocaleString() || "N/A"} miles</td>
                  </tr>
                  <tr>
                    <td>Year:</td>
                    <td>{car.year}</td>
                  </tr>
                  <tr>
                    <td>Engine:</td>
                    <td>{car.engine || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Transmission:</td>
                    <td>{car.transmission || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Fuel Type:</td>
                    <td>{car.fuel_type || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Condition:</td>
                    <td>{car.condition || "N/A"}</td>
                  </tr>
                  <tr>
                    <td>Color:</td>
                    <td>{car.color || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            )}

            <button className="btn see-more-btn" onClick={() => toggleCarDetails(car.id)}>
              {expandedCarId === car.id ? "See Less" : "See More"}
            </button>

            <div className="car-actions">
              <button className="btn inquiry-btn" onClick={() => toggleInquiryForm(car.id)}>
                <FaInfoCircle style={{ marginRight: "5px" }} />
                {selectedCarId === car.id ? "Close Inquiry" : "Inquiry"}
              </button>
            </div>
          </div>

          {selectedCarId === car.id && (
            <div className="inquiry-form-container">
              <ContactInquiry carId={car.id} />
            </div>
          )}
        </div>
      ))}

      <div className="pagination">
        {currentPage > 1 && (
          <button className="btn back-btn" onClick={handlePreviousPage}>
            Back
          </button>
        )}
        {currentPage < totalPages && (
          <button className="btn next-btn" onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default CarList;


















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaInfoCircle } from "react-icons/fa";
// import ContactInquiry from "../components/contact_inquiry";
// import "../components/car.css";

// const CarList = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedCarId, setSelectedCarId] = useState(null);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:5000/api/v1/cars/all");
//         console.log("Fetched cars:", response.data); // Log fetched cars
//         if (response.data && response.data.cars) {
//           setCars(response.data.cars);
//         } else {
//           setError("No cars found");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err); // Log fetch error
//         setError("Failed to fetch cars: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   const toggleInquiryForm = (carId) => {
//     console.log(`Toggling inquiry form for car ID: ${carId}`); // Log button click
//     setSelectedCarId(selectedCarId === carId ? null : carId);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="car-list">
//       {cars.map((car) => (
//         <div key={car.id} className="car-card">
//           <img
//             src={car.images[0] || "default-image-path.jpg"}
//             alt={`${car.make} ${car.model}`}
//             className="car-image"
//           />
//           <div className="car-details">
//             <h3 className="car-title">
//               {car.year} {car.make} {car.model}
//             </h3>
//             <div className="car-price">${car.price}</div>
//             <table className="car-specs-table">
//               <tbody>
//                 <tr>
//                   <td>Mileage:</td>
//                   <td>{car.mileage?.toLocaleString() || "N/A"} miles</td>
//                 </tr>
//                 <tr>
//                   <td>Year:</td>
//                   <td>{car.year}</td>
//                 </tr>
//                 <tr>
//                   <td>Engine:</td>
//                   <td>{car.engine || "N/A"}</td>
//                 </tr>
//                 <tr>
//                   <td>Steering:</td>
//                   <td>{car.steering || "N/A"}</td>
//                 </tr>
//                 <tr>
//                   <td>Seats:</td>
//                   <td>{car.seats || "N/A"}</td>
//                 </tr>
//                 <tr>
//                   <td>Fuel Type:</td>
//                   <td>{car.fuel_type || "N/A"}</td>
//                 </tr>
//                 <tr>
//                   <td>Body Type:</td>
//                   <td>{car.body_type || "N/A"}</td>
//                 </tr>
//                 <tr>
//                   <td>Transmission:</td>
//                   <td>{car.transmission || "N/A"}</td>
//                 </tr>
//                 <tr>
//                   <td>Condition:</td>
//                   <td>{car.condition || "N/A"}</td>
//                 </tr>
//                 <tr>
//                   <td>Color:</td>
//                   <td>{car.color || "N/A"}</td>
//                 </tr>
//               </tbody>
//             </table>
//             <div className="car-actions">
//               <button
//                 className="btn inquiry-btn"
//                 onClick={() => toggleInquiryForm(car.id)}
//               >
//                 <FaInfoCircle style={{ marginRight: "5px" }} />
//                 {selectedCarId === car.id ? "Close Inquiry" : "Inquiry"}
//               </button>
//             </div>
//           </div>

//           {selectedCarId === car.id && (
//             <div className="inquiry-form-container">
//               <ContactInquiry carId={car.id} />
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CarList;










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaInfoCircle, FaShoppingCart } from "react-icons/fa";
// import ContactInquiry from "../components/contact_inquiry";
// import CreateOrder from "../components/CreateOrder";
// import Categories from "../pages/Categories"; // Import Categories component
// import "../components/car.css";

// const CarList = () => {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedCarId, setSelectedCarId] = useState(null);
//   const [orderCarId, setOrderCarId] = useState(null);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await axios.get("http://127.0.0.1:5000/api/v1/cars");
//         setCars(response.data.cars || []);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch cars");
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   const toggleInquiryForm = (carId) => {
//     if (selectedCarId === carId) {
//       setSelectedCarId(null);
//     } else {
//       setSelectedCarId(carId);
//       setOrderCarId(null); 
//     }
//   };

//   const toggleOrderForm = (carId) => {
//     if (orderCarId === carId) {
//       setOrderCarId(null);
//     } else {
//       setOrderCarId(carId);
//       setSelectedCarId(null);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="car-list">
//       {Array.isArray(cars) && cars.map((car) => (
//         <div key={car.id} className="car-card">
//           <img
//             src={car.images[0]?.path || "default-image-path.jpg"}
//             alt={`${car.make} ${car.model}`}
//             className="car-image"
//           />
//           <div className="car-details">
//             <h3 className="car-title">
//               {car.year} {car.make} {car.model}
//             </h3>
//             <div className="car-price">${car.price}</div>
//             <table className="car-specs-table">
//               <tbody>
//                 <tr>
//                   <td>Mileage:</td>
//                   <td>{car.mileage?.toLocaleString() || "N/A"} miles</td>
//                 </tr>
//                 <tr>
//                   <td>Year:</td>
//                   <td>{car.year}</td>
//                 </tr>
//                 <tr>
//                   <td>Engine:</td>
//                   <td>{car.engine || "N/A"}</td>
//                 </tr>
//                 <tr>
//                   <td>Steering:</td>
//                   <td>{car.steering || "N/A"}</td>
//                 </tr>
//                 <tr>
//                   <td>Seats:</td>
//                   <td>{car.seats || "N/A"}</td>
//                 </tr>
//               </tbody>
//             </table>
//             <div className="car-actions">
//               <button
//                 className="btn inquiry-btn"
//                 onClick={() => toggleInquiryForm(car.id)}
//               >
//                 <FaInfoCircle style={{ marginRight: "5px" }} />
//                 {selectedCarId === car.id ? "Close Inquiry" : "Inquiry"}
//               </button>
//               <button
//                 className="btn buy-now-btn"
//                 onClick={() => toggleOrderForm(car.id)}
//               >
//                 <FaShoppingCart style={{ marginRight: "5px" }} />
//                 {orderCarId === car.id ? "Close Order" : "Buy Now"}
//               </button>
//             </div>
//           </div>

//           {selectedCarId === car.id && (
//             <div className="inquiry-form-container">
//               <ContactInquiry carId={car.id} />
//             </div>
//           )}

//           {orderCarId === car.id && (
//             <div className="order-form-container">
//               <CreateOrder carId={car.id} onClose={() => setOrderCarId(null)} />
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CarList;
