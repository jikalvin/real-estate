 import React from 'react'
 import logo from '../images/logo.webp'
 import { Link } from 'react-router-dom';
 
 import { useFirebaseAuth } from '../Files/FirebaseAuthContext';


 export default function Navbar() {
  const user = useFirebaseAuth();

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
             {/* {user && <Link to='/Dash'><li><a href='#' className='active'>Dashboard</a></li></Link>} */}
             <li><a href='Login'>Admin</a></li>
             <li><a href='Contact'>Contact</a></li>
       </ul>

        
 </nav>
  )
 }
 
 
 
