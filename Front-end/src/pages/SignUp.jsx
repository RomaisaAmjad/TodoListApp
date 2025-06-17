import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios.js';
import signUpImage from '../assets/signUp.jpg'

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  
  const navigate = useNavigate();
   
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post('/users/signup', formData); 
      const user = response.data; 
      console.log('Login Response:', user);  
      navigate('/welcome', { state: { user } });
    } catch (error) {
      console.log(error);
      alert('Login Failed Try Again!');
    }
  };


  return (
    
    <div className="relative min-h-screen flex items-center justify-center">
  <div
    className="absolute inset-0 bg-cover bg-center z-0"
    style={{
      backgroundImage: `url(${signUpImage})`,
    }}
  ></div>


  <div className="relative z-20 min-h-screen flex items-center justify-center px-5">
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className=" md:w-[500px] w-[350px] bg-white/10 backdrop-blur-lg p-12 rounded-xl border border-white/20 shadow-xl space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-white">
          Username
        </label>
        <input
          placeholder="username"
          type="text"
          name="username"
          id="username"
          required
          value={formData.username}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none bg-white/80"
        />
      </div>

      <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="JhonDoe@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none bg-white"
          />
        </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-white">
          Password
        </label>
        <input
          placeholder="password"
          type="password"
          name="password"
          id="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white/80"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-amber-600 text-white font-semibold py-2 px-4 rounded hover:bg-amber-700 transition hover:cursor-pointer"
      >
        Sign Up
      </button>
    </form>
  </div>
</div>
  );
};

export default SignUp;
