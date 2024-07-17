import React from 'react'
import { useState } from 'react';
import '../styles/signup.css'
import { PostData } from '../utils/api';
import { useNavigate } from 'react-router-dom';
// import { Alert } from '@mui/material';


function SignupScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ name, email, password });
        const result = await PostData('signupUser', { name, email, password });
        if (result) {
            alert("SignUp Successfully")
            navigate('/loginscreen');
        }

    };

    return (
        <div className="signUp">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                   
                </form>
                <p>or</p>
                <button onClick={()=>{navigate('/loginscreen')}}>Login</button>
            </div>
        </div>
    );
}


export default SignupScreen