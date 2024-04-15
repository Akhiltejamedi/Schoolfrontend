import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signin.css';

const Signin = ({ setisLoggedIn, ...props }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const navigate = useNavigate();

    const handleLogin = async ({ email, password }) => {
        try {
            const response = await fetch('http://localhost:8080/auth/generateToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password }),
            });

            if (response.ok) {
                setisLoggedIn(true);
                const data = await response.json();
                const token = data.token;
                localStorage.setItem('token', token);
                console.log('Login successful');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin({ email, password });
    };

    return (
        <div className="container">
            <div className="blur-background"></div>
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                <h3>New User? <Link to="/signup">Register here</Link></h3>
            </div>
        </div>
    );
};

export default Signin;
