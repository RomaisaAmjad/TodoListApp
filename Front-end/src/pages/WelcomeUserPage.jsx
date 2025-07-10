import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import  UserProfile from '../assets/Profile.png'
import ProfileNavBar from '../components/ProfileNavBar';


const WelcomeUser = () => {
  const location = useLocation();
  const { user } = location.state;

  return (
    <div className='relative flex flex-col justify-center'>
      <ProfileNavBar />

      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center text-white bg-gray-700" 
      >
        <div className="w-11/12 md:w-2/3 lg:w-1/2 bg-gray-300 p-6  shadow-md shadow-gray-900 text-center mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
      
          <div className="w-full md:w-1/2 flex justify-center">

          {/* <FaUser className='w-1/2 md:w-2/3 h-1/2 md:h-2/3 text-gray-900'></FaUser> */}
          
            <img src={UserProfile} alt="NotePad" className="w-1/2 md:w-2/3" />
          </div>

          
          <div className="w-full md:w-1/2 text-left space-y-3">
            <div>
              <h4 className=" text-md text-gray-700">Name:</h4>
              <h6 className="text-gray-700">{user.username}</h6>
            </div>
             <div className='bg-gray-900 h-px'></div>
            <div>
              <h4 className="text-md text-gray-700 ">Email:</h4>
              <h5 className="text-gray-700">{user.email}</h5>
            </div>
            <div className='bg-gray-900 h-px'></div>
          
            <div>
              <h4 className="text-md text-gray-700">Total Tasks:</h4>
              <h5 className="text-gray-700">{user.taskCount || 0}</h5>
            </div>
            <div className='bg-gray-900 h-px'></div>
            <Link
              to="/tasks"
              className="inline-block mt-2 px-5 py-2 bg-gray-700 text-white  text-sm rounded-2xl hover:bg-gray-600 transition shadow-md shadow-gray-900"
            >
              Show Tasks
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WelcomeUser;
