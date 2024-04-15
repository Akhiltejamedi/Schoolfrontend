import React, { useState } from 'react';
import "./signin.css";
import { useNavigate } from 'react-router-dom'; 
const Signup = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        roles: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/addNewUser', {
                method: 'POST',
                headers: {
                    //'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('User data submitted successfully');
                // Optionally, you can reset the form after successful submission
                setUserData({
                    name: '',
                    email: '',
                    password: '',
                    roles: ''
                });
                navigate("/");
            } else {
                console.error('Failed to submit user data');
            }
        } catch (error) {
            console.error('Failed to submit user data:', error);
        }
    };

    return (
        <div className='container'>
            <form className='form-container' onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={userData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={userData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={userData.password} onChange={handleChange}  />
                </div>
                <div>
                    <label>Role:</label>
                    <input type="text" name="roles" value={userData.roles} onChange={handleChange} required />
                </div>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
