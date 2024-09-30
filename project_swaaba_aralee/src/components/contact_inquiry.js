import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contact.css";

const ContactInquiry = ({ carId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone_number: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by verifying the presence of a token
    const token = localStorage.getItem("token"); // Assuming JWT token is stored here
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!isLoggedIn) {
      // If not logged in, redirect to the login page
      navigate("/login");
      return;
    }

    // Format the message to be sent to WhatsApp
    const whatsappMessage = `Inquiry about Car ID: ${carId}%0A
Name: ${formData.name}%0A
Email: ${formData.email}%0A
Phone Number: ${formData.phone_number}%0A
Message: ${formData.message}`;

    // WhatsApp number of Swaaba Aralee (e.g., 256XXXXXXXXX for Uganda)
    const whatsappNumber = "256740598271"; // Replace with the actual number

    // Create the WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");

    // Reset form and set success message
    setSuccess(true);
    setFormData({
      name: "",
      email: "",
      message: "",
      phone_number: "",
    });
  };

  return (
    <div className="text-center">
      <h2 className="header">Send Inquiry</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="inputGroup">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="inputGroup">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <div className="inputGroup">
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="textarea"
          ></textarea>
        </div>
        <div className="inputGroup">
          <input
            type="text"
            name="phone_number"
            placeholder="Your Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">
          Send Inquiry
        </button>
      </form>
      {!isLoggedIn && (
        <p>
          Please{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            log in
          </span>{" "}
          to send an inquiry.
        </p>
      )}
      {success && <p className="message success">Redirecting to WhatsApp!</p>}
      {error && <p className="message error">{error}</p>}
    </div>
  );
};

export default ContactInquiry;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/contact.css";

// const ContactInquiry = ({ carId }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//     phone_number: "",
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user is logged in by verifying the presence of a token
//     const token = localStorage.getItem("token"); // Assuming JWT token is stored here
//     if (token) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(false);

//     if (!isLoggedIn) {
//       // If not logged in, redirect to the registration page
//       navigate("/register"); // Redirect to the registration page
//       return;
//     }

//     // Format the message to be sent to WhatsApp
//     const whatsappMessage = `Inquiry about Car ID: ${carId}%0A
// Name: ${formData.name}%0A
// Email: ${formData.email}%0A
// Phone Number: ${formData.phone_number}%0A
// Message: ${formData.message}`;

//     // WhatsApp number of Swaaba Aralee (e.g., 256XXXXXXXXX for Uganda)
//     const whatsappNumber = "256740598271"; // Replace with the actual number

//     // Create the WhatsApp URL
//     const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

//     // Redirect to WhatsApp
//     window.open(whatsappUrl, "_blank");

//     setSuccess(true);
//     setFormData({
//       name: "",
//       email: "",
//       message: "",
//       phone_number: "",
//     });
//   };

//   return (
//     <div className="text-center">
//       <h2 className="header">Send Inquiry</h2>
//       {!isLoggedIn ? (
//         <p>Please <span className="login-link" onClick={() => navigate("/register")}>register</span> to send an inquiry.</p>
//       ) : (
//         <form onSubmit={handleSubmit} className="form">
//           <div className="inputGroup">
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="input"
//             />
//           </div>
//           <div className="inputGroup">
//             <input
//               type="email"
//               name="email"
//               placeholder="Your Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="input"
//             />
//           </div>
//           <div className="inputGroup">
//             <textarea
//               name="message"
//               placeholder="Message"
//               value={formData.message}
//               onChange={handleChange}
//               required
//               className="textarea"
//             ></textarea>
//           </div>
//           <div className="inputGroup">
//             <input
//               type="text"
//               name="phone_number"
//               placeholder="Your Phone Number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               required
//               className="input"
//             />
//           </div>
//           <button type="submit" className="button">
//             Send Inquiry via WhatsApp
//           </button>
//         </form>
//       )}
//       {success && (
//         <p className="message success">Redirecting to WhatsApp!</p>
//       )}
//       {error && <p className="message error">{error}</p>}
//     </div>
//   );
// };

// export default ContactInquiry;
