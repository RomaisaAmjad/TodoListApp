import React from 'react';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';
import profileImage from '../assets/ProfileSection.jpg'
import NavBar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx';

const WelcomeUser = () => {
  const location = useLocation();
  const { user } = location.state;


  return (
    <div className='relative'>
      <NavBar/>
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
    style={{
      backgroundImage: `url(${profileImage})`,
     }}>

      <div className="bg-red-900/70 p-6 rounded-xl shadow-md shadow-red-900 text-center backdrop-blur-lg mt-10">
        <h1 className="text-2xl font-bold mb-4 p-10"> Hello, {user.username}!</h1>
        <h3 className='text-white' style={{ fontFamily: 'Playfair Display' }} >Big goals start with small tasks. Let’s get things done — one step at a time</h3>
        <h2 className='text-white'>✅ Organize 🌱 Grow 🚀 Succeed!💪🏻</h2>
        <p className='p-4'>Email: {user.email}</p>
        <p className='mb-5'>Total Tasks: {user.taskCount || 0}</p>
        <Link to='/tasks' className='p-3 bg-white text-red-700 font-bold rounded-2xl  hover:cursor-pointer shadow-md shadow-amber-900'>Show Tasks</Link>
      </div>
      
    </div>

    <Footer/>

    </div>
  );
};

export default WelcomeUser;
