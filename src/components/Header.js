
import React from 'react';
import './Header.css';
import 
    Forms
   from './Sign';

const Header = () => {
    return (
        <header>
        <h1 className='mainHeader'>Fitness Tracker</h1>
        <Forms />
        
        </header>
    )
}

export default Header;