import React from "react";
import { useNavigate } from 'react-router-dom';
//import { useState } from "react";
//import StudentEntry from "./StudentEntry";
import './Homepage.css';
const Homepage = ({setisLoggedIn,...props}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setisLoggedIn(false);
        navigate('/'); 
    };
    const handleStudentEntry = () => {
      
        navigate('/AddStudent'); 
    };
    const handleRemoveEntry=()=>{
        navigate('/RemoveStudent');
    }
    const handleRemoveAccess=()=>{
        navigate('/RemoveAccess');
    }
    const handleGetStudents=()=>{
        navigate('/GetStudents');
    }

    return (
        <div className="homepage-container">
            <button className="button" onClick={handleStudentEntry}>Add New Student</button>
            <button className="button" onClick={handleRemoveEntry}>Remove Student</button>
            <button className="button" onClick={handleRemoveAccess}>Remove User</button>
            <button className="button" onClick={handleGetStudents}>View Students</button>
            <button className="button logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Homepage;
