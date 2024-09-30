import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import '../styles/AboutUs.css';
import BackgroundSlider from '../components/BackgroundSlider';
import Typewriter from 'typewriter-effect';
import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/home.css';
import image1 from '../assets/swaaba1.png';
import image2 from '../assets/swaaba7.png';
import image3 from '../assets/swaaba2.png';
import image4 from '../assets/swaaba9.png';
import image5 from '../assets/swaaba8.png';
import image6 from '../assets/swaaba10.png';
import video from '../assets/media.mp4';  
import SearchComponent from '../components/search'; 

const Home = () => {
  const navigate = useNavigate();

  const images = [
    { 
      src: image1, 
      alt: 'Description 1', 
      description: '2022 Tesla Model S Plaid is a cutting-edge electric vehicle.',
    },
    { 
      src: image2, 
      alt: 'Description 2', 
      description: 'It is available in 3 variants, 2982 cc engine option.',
    },
    { 
      src: image3, 
      alt: 'Description 3', 
      description: 'Battery and Drive Unit: 8 years or 150,000 miles, Basic',
      carId: 72
    },
    { 
      src: image4, 
      alt: 'Description 4', 
      description: 'Battery and Drive Unit: 8 years or 150,000 miles, Basic Vehicle',
    },
    { 
      src: image5, 
      alt: 'Description 5', 
      description: 'Battery and Drive Unit: 8 years or 150,000 miles, Basic Vehicle',
    },
    { 
      src: image6, 
      alt: 'Description 6', 
      description: 'Battery and Drive Unit: 8 years or 150,000 miles.',
    },
  ];

  const handleImageClick = (carId) => {
    navigate(`/cars/${carId}`); // Navigate to CarList with carId as a parameter
  };

  return (
    <div className="home-container">
      <BackgroundSlider />
      <div className='text'>
        <h1>FIND YOUR PERFECT RIDE!</h1>
        <Typewriter
          options={{
            strings: ['Just Keep Moving Forward'],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      {/* Include SearchComponent at the top */}
      <div className="search-section">
        <SearchComponent />
      </div><br></br><br></br>
      <h3 className="section-title">Explore the latest Rides</h3>
      <div className="image-slider">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="image-card"
            onClick={() => handleImageClick(index)} 
          >
            <img src={image.src} alt={image.alt} className="image" />
            <div className="description">{image.description}</div>
          </div>
        ))}
      </div>
      <br /><br />
      <div className="video-section">
        <div className="video-container">
          <video controls className="video">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="video-text">
          <h2>Get a fair Price for Your Desired Car Today</h2>
          <p>Sell to us Your Car Today.</p>
          <div className="bullet-list">
            <ul>
              <li>Discover a curated collection of meticulously inspected and expertly curated vehicles at Swaab Aralee Cars.</li>
              <li>We specialize in offering a diverse range of cars that cater to every lifestyle and budget.</li>
              <li>Whether you're searching for a sleek sedan, a versatile SUV, or a powerful sports car, you'll find it here.</li>
            </ul>
            <a href="/contact" className="contact-button">
              Get Started
            </a>
          </div>
        </div>
      </div>
      <FAQ />
      <Footer name='Footer' />
    </div>
  );
};

export default Home;
