import React, { useState ,useEffect} from 'react';
import './StudentEntry.css';
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

const StudentEntry = () => {
    const [userData, setUserData] = useState({
        studentName: '',
        studentRollNo: '',
        studentClass: '',
        parentName: '',
        parentEmail: ''
    });
    const [submitSuccess,setSubmitSuccess]=useState(false);
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
            const response = await fetch('http://localhost:8080/auth/addNewStudent', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('User data submitted successfully');
                setSubmitSuccess(true);
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
            
                setUserData({
                    studentName: '',
                    studentRollNo: '',
                    studentClass: '',
                    parentName: '',
                    parentEmail: ''
                });
            } else {
                console.error('Failed to submit user data');
            }
        } catch (error) {
            console.error('Failed to submit user data:', error);
        }
    };

    return (
        <div>
        <div className='student-container'>
            <h2>Student Data Entry</h2>
            <form className='student-entry-form' onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="studentName" value={userData.studentName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Roll No:</label>
                    <input type="text" name="studentRollNo" value={userData.studentRollNo} onChange={handleChange} required />
                </div>
                <div>
                    <label>Class:</label>
                    <input type="text" name="studentClass" value={userData.studentClass} onChange={handleChange} required />
                </div>
                <div>
                    <label>Parent's Name:</label>
                    <input type="text" name="parentName" value={userData.parentName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Parent's Email:</label>
                    <input type="email" name="parentEmail" value={userData.parentEmail} onChange={handleChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
            {submitSuccess&&<p>Student Added Successfully</p>}  
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

export default StudentEntry;
