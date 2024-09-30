// import React, { useState } from "react";
// import axios from "axios";
// import '../styles/Login.css';
// import Footer from "../components/Footer"; 
// import '../styles/Footer.css';
// // import backgroundVideo from '../assets/news.mp4'; // Adjust the path as needed

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [subscribeEmail, setSubscribeEmail] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [subscribeMessage, setSubscribeMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/api/v1/user/login", {
//         email,
//         password,
//       });

//       const { access_token, user_id, user_name, avatar_url } = response.data;
//       localStorage.setItem("token", response.data.token);
//       localStorage.setItem("access_token", access_token);
//       localStorage.setItem("user_id", user_id);
//       localStorage.setItem("user_name", user_name);
//       localStorage.setItem("user_avatar", avatar_url); 

//       setEmail("");
//       setPassword("");
//       setError("");
//       setSuccessMessage("Login successful!");

//       setTimeout(() => {
//         setSuccessMessage("");
//         window.location.reload(); 
//       }, 2000);
//     } catch (error) {
//       setError("Invalid email or password");
//       setSuccessMessage("");
//     }
//   };

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     setSubscribeMessage(`Subscribed with: ${subscribeEmail}`);
//     setSubscribeEmail("");
//   };

//   return (
//     <div className="login-container">
     
//       <div className="login-card">
//         <form onSubmit={handleSubmit}>
//           <div className="text_area">
//             <p>SWAABA ARALEE ENTERPRISES LTD</p>
//             <input
//               type="email"
//               placeholder="Email"
//               className="text_input"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="text_area">
//             <input
//               type="password"
//               placeholder="Password"
//               className="text_input"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn">
//             Login
//           </button>
//           {error && <div className="swaaba">{error}</div>}
//           {successMessage && <div className="swaaba success">{successMessage}</div>}
//         </form>
//       </div>
//       {/* Subscribe Section */}
//       <div className="subscribe-container">
//         <div className="subscribe-card">
//           <form onSubmit={handleSubscribe}>
//             <div className="Paragraph">
//               <h2>Subscribe to our Newsletter</h2>
//               <p>Get latest updates to our special offers</p>
//             </div>
//             <input
//               type="email"
//               id="subscribeEmail"
//               name="subscribeEmail"
//               placeholder="Your email"
//               className="subscribe_input"
//               value={subscribeEmail}
//               onChange={(e) => setSubscribeEmail(e.target.value)}
//               required
//             />          
//             <button type="submit" className="btn subscribe-btn">
//               Subscribe
//             </button>
//             {subscribeMessage && <div className="swaaba success">{subscribeMessage}</div>}
//           </form>
//         </div>
//       </div>
//       <div>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <Footer name='Footer' />
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../styles/Login.css';
import Footer from "../components/Footer"; 
import '../styles/Footer.css';
// import backgroundVideo from '../assets/news.mp4'; // Adjust the path as needed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/v1/user/login", {
        email,
        password,
      });

      const { access_token, user_id, user_name, avatar_url } = response.data;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("user_name", user_name);
      localStorage.setItem("user_avatar", avatar_url); 

      setEmail("");
      setPassword("");
      setError("");
      setSuccessMessage("Login successful!");

      // Redirect to the dashboard if the email matches
      if (email === "hananny22@gmail.com") {
        setTimeout(() => {
          navigate("/dashboard"); // Navigate to the dashboard
        }, 2000);
      } else {
        setTimeout(() => {
          setSuccessMessage("");
          window.location.reload(); // For other users, reload the page
        }, 2000);
      }
    } catch (error) {
      setError("Invalid email or password");
      setSuccessMessage("");
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribeMessage(`Subscribed with: ${subscribeEmail}`);
    setSubscribeEmail("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <div className="text_area">
            <p>SWAABA ARALEE ENTERPRISES LTD</p>
            <input
              type="email"
              placeholder="Email"
              className="text_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="text_area">
            <input
              type="password"
              placeholder="Password"
              className="text_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          {error && <div className="swaaba">{error}</div>}
          {successMessage && <div className="swaaba success">{successMessage}</div>}
        </form>
      </div>
      {/* Subscribe Section */}
      <div className="subscribe-container">
        <div className="subscribe-card">
          <form onSubmit={handleSubscribe}>
            <div className="Paragraph">
              <h2>Subscribe to our Newsletter</h2>
              <p>Get latest updates to our special offers</p>
            </div>
            <input
              type="email"
              id="subscribeEmail"
              name="subscribeEmail"
              placeholder="Your email"
              className="subscribe_input"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              required
            />          
            <button type="submit" className="btn subscribe-btn">
              Subscribe
            </button>
            {subscribeMessage && <div className="swaaba success">{subscribeMessage}</div>}
          </form>
        </div>
      </div>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer name='Footer' />
      </div>
    </div>
  );
};

export default Login;












