import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [cars, setCars] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [mostlySearchedCars, setMostlySearchedCars] = useState([]);
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        description: '',
        engine: '',
        steering: '',
        mileage: '',
        fuel_type: '',
        body_type: '',
        transmission: '',
        condition: '',
        color: '',
        images: '',
    });
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isAdmin, setIsAdmin] = useState(true);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role;

            if (userRole !== 'admin') {
                setIsAdmin(false);
                return;
            }

            // Fetch data for users, cars, contacts, and mostly searched cars
            const fetchData = async () => {
                try {
                    const userResponse = await axios.get('http://127.0.0.1:5000/api/v1/user/users', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const carResponse = await axios.get('http://127.0.0.1:5000/api/v1/cars/all', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const contactResponse = await axios.get('http://127.0.0.1:5000/api/v2/contact_bp/send', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const searchedCarsResponse = await axios.get('http://127.0.0.1:5000/api/v1/cars/search', {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    setUsers(userResponse.data);
                    setCars(carResponse.data);
                    setContacts(contactResponse.data);
                    setMostlySearchedCars(searchedCarsResponse.data);
                } catch (error) {
                    console.error('Error fetching data:', error.message);
                }
            };

            fetchData();
        } catch (error) {
            console.error('Error decoding token:', error.message);
            setIsAuthenticated(false);
        }
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCarData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddCar = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1/cars/create', carData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Car added successfully!');
            setCars((prevCars) => [...prevCars, response.data]); // Add new car to the list
            setCarData({
                make: '',
                model: '',
                year: '',
                price: '',
                description: '',
                engine: '',
                steering: '',
                mileage: '',
                fuel_type: '',
                body_type: '',
                transmission: '',
                condition: '',
                color: '',
                images: '',
            }); // Reset the form
        } catch (error) {
            console.error('Error adding car:', error.message);
            alert('Error adding car');
        }
    };

    const handleDeleteCar = async (carId) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/api/v1/cars/delete`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Car deleted successfully!');
            setCars((prevCars) => prevCars.filter((car) => car.id !== carId)); 
        } catch (error) {
            console.error('Error deleting car:', error.message);
            alert('Error deleting car');
        }
    };

    if (!isAuthenticated) return <Navigate to="/login" />;
    if (!isAdmin) return <Navigate to="/not-authorized" />;

    return (
        <div>
            <h1>Admin Dashboard</h1>

            <section>
                <h2>Users</h2>
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>
                            {user.first_name} {user.last_name}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Add a New Car</h2>
                <form onSubmit={handleAddCar}>
                    {Object.keys(carData).map((field) => (
                        <input
                            key={field}
                            type="text"
                            name={field}
                            value={carData[field]}
                            onChange={handleInputChange}
                            placeholder={field.replace('_', ' ').toUpperCase()}
                        />
                    ))}
                    <button type="submit">Add Car</button>
                </form>
            </section>

            <section>
                <h2>All Cars</h2>
                <ul>
                    {cars.map((car) => (
                        <li key={car.id}>
                            {car.make} {car.model} ({car.year}) - {car.price}
                            <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Contacts</h2>
                <ul>
                    {contacts.map((contact, index) => (
                        <li key={index}>
                            {contact.name} - {contact.email}
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h2>Most Searched Cars</h2>
                <ul>
                    {mostlySearchedCars.map((car, index) => (
                        <li key={index}>
                            {car.make} {car.model} ({car.year})
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AdminDashboard = () => {
//     const [adminData, setAdminData] = useState({
//         users: [],
//         contacts: [],
//     });
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchData = async () => {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 navigate('/dashboard');  
//             }

//             try {
//                 // Fetch total users
//                 const usersResponse = await axios.get(
//                     '/api/v1/user/Users', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
                
//                 // Fetch contacts
//                 const contactsResponse = await axios.get(`http://127.0.0.1:5000/api/v2/contact_bp/contact`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 setAdminData({
//                     users: usersResponse.data.users,
//                     contacts: contactsResponse.data.contacts,
//                 });
//             } catch (err) {
//                 setError('Access denied or error fetching data');
//                 localStorage.removeItem('token');
//                 navigate('/dashboard');  // Redirect if unauthorized
//             }
//         };

//         fetchData();
//     }, [navigate]);

//     return (
//         <div className="admin-dashboard">
//             <h1>Admin Dashboard</h1>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {adminData.users.length > 0 && (
//                 <div>
//                     <h2>Total Users: {adminData.users.length}</h2>
//                     <h3>User List:</h3>
//                     <ul>
//                         {adminData.users.map((user) => (
//                             <li key={user.id}>
//                                 {user.first_name} {user.last_name} - {user.email}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//             {adminData.contacts.length > 0 && (
//                 <div>
//                     <h2>Total Contacts: {adminData.contacts.length}</h2>
//                     <h3>Contact Messages:</h3>
//                     <ul>
//                         {adminData.contacts.map((contact) => (
//                             <li key={contact.id}>
//                                 <strong>{contact.username}</strong>: {contact.message} (Email: {contact.email})
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//             {adminData.users.length === 0 && adminData.contacts.length === 0 && (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default AdminDashboard;






















// // // src/components/AdminLogin.js
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const AdminLogin = () => {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [error, setError] = useState('');
// //     const navigate = useNavigate();

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const response = await axios.post('/api/v1/user/login', { email, password });
// //             const { access_token } = response.data;
// //             localStorage.setItem('token', access_token);
// //             // Navigate to the dashboard if login is successful
// //             navigate('/admin/dashboard');
// //         } catch (err) {
// //             setError('Invalid email or password');
// //         }
// //     };

// //     return (
// //         <div className="admin-login">
// //             <h2>Admin Login</h2>
// //             {error && <p style={{ color: 'red' }}>{error}</p>}
// //             <form onSubmit={handleSubmit}>
// //                 <input
// //                     type="email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     placeholder="Email"
// //                     required
// //                 />
// //                 <input
// //                     type="password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     placeholder="Password"
// //                     required
// //                 />
// //                 <button type="submit">Login</button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default AdminLogin;


