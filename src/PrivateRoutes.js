import React from "react";
import { BrowserRouter as Router, Route,  Routes } from "react-router-dom";
import Homepage from "./homepage";
import StudentEntry from "./StudentEntry";
import RemoveEntry from "./RemoveEntry";
import RemoveAccess from "./RemoveAccess";
import GetStudents from "./GetStudents";
const PrivateRoutes=({setisLoggedIn,...props})=>{
   return (
    <Router>
    <Routes>
        <Route path="/AddStudent"   element={<StudentEntry/>} />
        <Route path="/RemoveStudent"   element={<RemoveEntry/>} />
        <Route path="/RemoveAccess"   element={<RemoveAccess/>} />
        <Route path="/GetStudents" index  element={<GetStudents/>} />
        <Route path="/"  element={<Homepage setisLoggedIn={setisLoggedIn}/>} />
    </Routes>
  </Router>
   ) 
}
 

  

export default PrivateRoutes;