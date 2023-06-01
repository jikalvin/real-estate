 import React from 'react'
 import logo from '../images/logo.webp'
 import { Link } from 'react-router-dom';
 


 export default function Navbar() {
   return (
     <nav>
        <a href='#' className='logo'>
        <Link to='/'>
           <img src={logo} alt='' />
         </Link>
        </a>
         <input className='menu-btn' type='checkbox' id='menu-btn'></input>
          <label className='menu-icon'>
         <span className='nav-icon'></span>
         </label>
         <ul className='menu'>
             <Link to='/'><li><a href='#' className='active'>Home</a></li></Link>
             <li><a href='#'>Guest Houses</a></li>
             <li><a href='#'>Apartments</a></li>
             <li><a href='Contact'>Studios</a></li>
             <li><a href='Contact'>Single Rooms</a></li>
       </ul>

        
 </nav>
  )
 }
 
 
 
