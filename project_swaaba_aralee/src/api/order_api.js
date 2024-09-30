import axios from 'axios';

const order_api = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}http://127.0.0.1:5000/api/v1/orders/`, 
});

// Function to send the create order request
export const createOrder = async (orderData, token) => {
    try {
        const response = await order_api.post('/create', orderData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        throw error; 
    }
};
