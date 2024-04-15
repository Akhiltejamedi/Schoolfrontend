import React, { useState,useEffect } from "react";
import './RemoveEntry.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'id',
    headerName: 'User Id',
    type: 'number',
    width: 150,
   
  },
  {
    field: 'name',
    headerName: 'User Name',
    width: 150,
   
  },
  {
    field: 'email',
    headerName: 'user Email',
    width: 160,
  },
];

const RemoveAccess = () => {
    const [id, setId] = useState('');
   /* const [removeSuccess,setremoveSuccess]=useState(false);
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/getUsers', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token to Authorization header
                        'Content-Type': 'application/json' // Assuming JSON is being sent
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const students = await response.json();
                // Ensure each student object has a unique "id" property
                const rowsWithIds = students.map(student => ({
                  ...student,
                  id: student.studentId // Use studentId as the unique ID
                }));
                setRowData(rowsWithIds);// Use studentId as the unique ID
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData(); // Call the async function
    }, []);
    
      console.log(rowData);*/
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/auth/removeUser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                // If you need to send any additional data in the body, you can include it here
                // body: JSON.stringify({ id }),
            });

            if (response.ok) {
                console.log('User removed successfully');
                /*const updatedResponse = await fetch('http://localhost:8080/auth/getUsers', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!updatedResponse.ok) {
                    throw new Error('Network response was not ok');
                }
    
                const updatedStudents = await updatedResponse.json();
                const updatedRowsWithIds = updatedStudents.map(student => ({
                  ...student,
                  id: student.studentId // Use studentId as the unique ID
                }));
                setRowData(updatedRowsWithIds);
                setremoveSuccess(true);*/
                setId('');
            } else {
                console.error('Failed to remove user');
            }
        } catch (error) {
            console.error('Failed to remove user:', error);
        }
    };

    return (
        <div className="remove-entry-container">
            <h2>Remove User</h2>
            <form className="remove-entry-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                    placeholder="Enter User ID"
                    required 
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RemoveAccess;
