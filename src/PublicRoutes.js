import React from "react";
import { BrowserRouter as Router, Route,  Routes } from "react-router-dom";
import Signin from "./signin";
import Signup from "./signup";

const PublicRoutes=({setisLoggedIn})=>{     
     //  {console.log('public routes')}

  return (
      <Router>
        <Routes>
          <Route path="/"  element={<Signin setisLoggedIn={setisLoggedIn}/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </Router>
  );  
   
}
export default PublicRoutes;