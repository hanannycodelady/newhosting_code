import React, { useState } from "react";
import { sendContactMessage } from "../api/api"; 
import "../styles/contact.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faFacebook,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await sendContactMessage(formData);
      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err.response ? err.response.data.error : "An error occurred");
    }
  };

  return (
    <div>
      {/* Heading Section */}
      <div className="heading-container">
        <h1>Get in Touch with Us Today</h1>
        <p>Help us to know how we can help you</p>
      </div>

      {/* Contact Section */}
      <div className="contact-container">
        {/* Left Side - Contact Information */}
        <div className="contact-info">
          <h2>Contact Information</h2>
          <ul className="contact-list">
            <li>
              <FontAwesomeIcon icon={faPhone} className="icon" />
              Contact Number: +256 780 619 890
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} className="icon" />
              Other Contact: +256 702 721 528
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              Email: info@swaaba_aralee.com
            </li>
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              Location: Nakawa Opposite Spare Motors, Kampala, Uganda
            </li>
            <li>
              <FontAwesomeIcon icon={faTwitter} className="icon" />
              Twitter: @swaaba_aralee
            </li>
            <li>
              <FontAwesomeIcon icon={faInstagram} className="icon" />
              Instagram: @swaaba_aralee motors
            </li>
            <li>
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              Facebook: swaaba_aralee
            </li>
            <li>
              <FontAwesomeIcon icon={faTiktok} className="icon" />
              TikTok: @swaabaAralee
            </li>
          </ul>
        </div>

        {/* Right Side - Contact Form */}
        <div className="contact-form">
          <h2>Send Message</h2>
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
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
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
            <button type="submit" className="button">
              Send Message
            </button>
          </form>
          {success && <p className="message success">Message sent successfully!</p>}
          {error && <p className="message error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Contact;



















// import React, { useState } from "react";
// import { sendContactMessage } from "../api/api"; // Adjust this path as necessary
// import "../styles/contact.css";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(false);

//     try {
//       await sendContactMessage(formData);
//       setSuccess(true);
//       setFormData({
//         name: "",
//         email: "",
//         subject: "",
//         message: "",
//       });
//     } catch (err) {
//       console.error("Error sending message:", err);
//       setError(err.response ? err.response.data.error : "An error occurred");
//     }
//   };

//   return (
//     <>
//       <div className="text-center">
//           <h2 className="header">Send Message</h2>
//           <form onSubmit={handleSubmit} className="form">
//             <div className="inputGroup">
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//             </div>
//             <div className="inputGroup">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//             </div>
//             <div className="inputGroup">
//               <input
//                 type="text"
//                 name="subject"
//                 placeholder="Subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 required
//                 className="input"
//               />
//             </div>
//             <div className="inputGroup">
//               <textarea
//                 name="message"
//                 placeholder="Message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 className="textarea"
//               ></textarea>
//             </div>
//             <button type="submit" className="button">
//               Send Message
//             </button>
//           </form>
//           {success && (
//             <p className="message success">Message sent successfully!</p>
//           )}
//           {error && <p className="message error">{error}</p>}
//         </div>
      
//     </>
//   );
// };

// export default Contact;

