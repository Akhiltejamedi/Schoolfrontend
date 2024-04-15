import React, { useMemo, useState } from 'react';
import './App.css';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
const App = () => {

    const [isLoggedIn, setisLoggedIn] = useState(false)




    const isToken = useMemo(() => {
        // Perform the calculation based on the value of isLoggedIn
        return  localStorage?.getItem('token')
    }, [isLoggedIn]);

    console.log('hello nicks',isLoggedIn,isToken )

    
    return (
        <div> {}{(isToken || isLoggedIn) ? <PrivateRoutes setisLoggedIn={setisLoggedIn}/> : <PublicRoutes setisLoggedIn={setisLoggedIn}/>}</div>
        
    );
};

export default App;

