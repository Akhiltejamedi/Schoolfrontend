import React, { useState, useEffect } from 'react';
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



const GetStudents = () => {
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState([]);
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
  // Container: Defines the grid's theme & dimensions.
  return (
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
);
}
export default GetStudents;