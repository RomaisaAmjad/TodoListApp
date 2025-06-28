import React from 'react';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';

const WelcomeUser = () => {
  const location = useLocation();
  const { user } = location.state;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-amber-500">
      <div className="bg-grey-900 p-10 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4"> Hello, {user.username}!</h1>
        <p>Email: {user.email}</p>
        <p className='mb-5'>Total Tasks: {user.taskCount || 0}</p>
        <Link to='/tasks' className='p-3 bg-white text-amber-500 font-bold rounded-2xl border-2 border-amber-500 hover:cursor-pointer'>Show Tasks</Link>
      </div>
      
    </div>
  );
};

export default WelcomeUser;
