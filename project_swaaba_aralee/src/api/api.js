import axios from "axios"; 

const contact_api = axios.create({
    baseURL: "http://127.0.0.1:5000/api/v2/contact_bp", 
  });
  
  export const sendContactMessage = async (formData) => {
    try {
      const response = await contact_api.post(`/send`, {
        username: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        // user_id: 1,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

  