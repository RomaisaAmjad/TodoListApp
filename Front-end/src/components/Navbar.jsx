import React from 'react';
import TodoIcon from '../assets/TodoIcon.png';
import { Link } from 'react-router-dom';

function ProfileNavbar() {
  const user = JSON.parse(localStorage.getItem("user")); 

  return (
    <div className="fixed top-2 left-0 right-0 z-10">
      <div className="w-1/2 mx-auto px-6 py-3  flex items-center justify-between
                      text-white shadow-lg 
                      bg-gray-500/30 rounded-3xl backdrop-blur-xl border border-white/10 opacity-90">
        <div className="flex items-center gap-2">
          <img width="30px" src={TodoIcon} alt="Todo Icon" />
          <h1 className="font-semibold text-lg">VoidList</h1>
        </div>
        <div>
          <Link to="/login" className="hover:border-b m-2">
            Logout
          </Link>
          <Link to="/welcome" state={{ user }} className="hover:border-b m-2">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileNavbar;
