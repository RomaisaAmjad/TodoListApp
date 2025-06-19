import React from 'react';
import HeroImage from '../assets/HeroSection.jpg';
import TypingEffect from '../components/TypingEffect';
import {Link} from 'react-router-dom';

function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
  
      <div
        className=" min-w-screen absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${HeroImage})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-70 z-10"></div>

      <div className="relative z-20 text-center text-white space-y-4 px-4">
        <h1 className="text-5xl font-extrabold">Todo List</h1>
        {/* <h3 className="text-2xl font-bold">Turn your to-dos into ta-das</h3> */}
        <TypingEffect/>
        <div className='flex justify-center gap-4'>
        <button className="bg-white text-black px-6 py-2 rounded-md font-bold hover:bg-gray-200  hover:cursor-pointer transition shadow-grey-100 shadow-xl">
          <Link to="/login">Log In</Link>
        </button>
        <button className="bg-white text-black px-6 py-2 rounded-md font-bold hover:bg-gray-200  hover:cursor-pointer transition shadow-grey-100 shadow-xl">
          <Link to="/signup">Sign Up</Link>
        </button>
        
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
