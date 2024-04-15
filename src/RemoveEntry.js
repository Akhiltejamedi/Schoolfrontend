import React, { useState,useEffect } from "react";
import './RemoveEntry.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'studentId',
    headerName: 'Student Id',
    type: 'number',
    width: 150,
   
  },
  {
    field: 'studentName',
    headerName: 'Student Name',
    width: 150,
   
  },
  {
    field: 'studentRollNo',
    headerName: 'Student Rollno',
    type: 'number',
    width: 110,
   
  },
  {
    field: 'studentClass',
    headerName: 'Student Class',
    type: 'number',
    width: 160,
  },
  {
    field: 'parentName',
    headerName: 'Parent Name',
    width: 160,
  },{
    field: 'parentEmail',
    headerName: 'Parent Email',
    width: 160,
  },
];


const RemoveEntry = () => {
    const [id, setId] = useState('');
    const [rowData, setRowData] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState(false); 
  // Fetch data & update rowData state
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/getStudents', {
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

  console.log(rowData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        try {
            const response = await fetch(`http://localhost:8080/auth/removeStudent/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                // If you need to send any additional data in the body, you can include it here
                // body: JSON.stringify({ id }),
            });

            if (response.ok) {
                console.log('Student removed successfully');
                const updatedResponse = await fetch('http://localhost:8080/auth/getStudents', {
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
                
                setSubmitSuccess(true);

                setId('');
            } else {
                console.error('Failed to remove student');
            }
        } catch (error) {
            console.error('Failed to remove student:', error);
        }
    };

    return (
        <div>
       <div className="remove-entry-container">
            <h2>Remove Student</h2>
            <form className="remove-entry-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={id} 
                    onChange={(e) => setId(e.target.value)} 
                    placeholder="Enter Student ID"
                    required 
                />
                <button type="submit">Submit </button>
            </form>
            {submitSuccess&&<p>Student Removed Successfully</p>}  
        </div>
        <Box sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rowData}
      columns={columns}
      //getRowId={(row) => row.id || row.index}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
    />
  </Box>
        </div>
       
    );
};

export default RemoveEntry;
