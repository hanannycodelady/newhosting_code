import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [adminData, setAdminData] = useState({
        users: [],
        contacts: [],
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/dashboard');  
            }

            try {
                // Fetch total users
                const usersResponse = await axios.get('/api/v1/user/Users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                // Fetch contacts
                const contactsResponse = await axios.get('/api/v2/contact_bp/contact', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setAdminData({
                    users: usersResponse.data.users,
                    contacts: contactsResponse.data.contacts,
                });
            } catch (err) {
                setError('Access denied or error fetching data');
                localStorage.removeItem('token');
                navigate('/dashboard');  // Redirect if unauthorized
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {adminData.users.length > 0 && (
                <div>
                    <h2>Total Users: {adminData.users.length}</h2>
                    <h3>User List:</h3>
                    <ul>
                        {adminData.users.map((user) => (
                            <li key={user.id}>
                                {user.first_name} {user.last_name} - {user.email}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {adminData.contacts.length > 0 && (
                <div>
                    <h2>Total Contacts: {adminData.contacts.length}</h2>
                    <h3>Contact Messages:</h3>
                    <ul>
                        {adminData.contacts.map((contact) => (
                            <li key={contact.id}>
                                <strong>{contact.username}</strong>: {contact.message} (Email: {contact.email})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {adminData.users.length === 0 && adminData.contacts.length === 0 && (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminDashboard;






















// // src/components/AdminLogin.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/v1/user/login', { email, password });
//             const { access_token } = response.data;
//             localStorage.setItem('token', access_token);
//             // Navigate to the dashboard if login is successful
//             navigate('/admin/dashboard');
//         } catch (err) {
//             setError('Invalid email or password');
//         }
//     };

//     return (
//         <div className="admin-login">
//             <h2>Admin Login</h2>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default AdminLogin;


