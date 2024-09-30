import axios from "axios";

// Create an Axios instance with the base URL for the API
const contact_api = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v2/contact_blueprint/", 
});

// Function to send contact inquiry data to the backend
export const sendContactInquiry = async (formData) => {
  try {
    // Make a POST request to the contact API endpoint
    const response = await contact_api.post(`/send`, {
      username: formData.name,       
      email: formData.email,         
      message: formData.message,   
      car_id: formData.car_id,      
      phone_number: formData.phone_number,  
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};
