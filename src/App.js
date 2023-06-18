import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './Files/Home';
import Header from './Components.js/Header';
import PropertyDetails from './Files/PropertyDetails';
import Contact from './Components.js/Contact';
import Footer from './Components.js/Footer';
import Login from './Components.js/Login';
import Dash from './Components.js/Dash';

import Chat from './Components.js/Chat';
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <div className='max-w-[1440px] h-12 mx-auto bg-white'>
    <Header />
    <ToastContainer />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Dash' element={<Dash />} />
      <Route path='/Contact' element={<Contact />} />
      
      <Route path='/property/:id' element={<PropertyDetails />} />
    </Routes>
    {/* <Contact/> */}
    {/* <Chat /> */}
   <Footer/>
  </div>
  );
}

export default App;
