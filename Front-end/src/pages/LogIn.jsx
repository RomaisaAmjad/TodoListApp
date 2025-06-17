import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logInImage from '../assets/logIn.avif';
import API from '../api/axios.js';

const LogIn = () => {
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
      const response = await API.post('/users/logIn', formData);
      const { token, user } = response.data;

  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log('Login Response:', user);

      
      navigate('/welcome', { state: { user } });
    } catch (error) {
      console.log(error);
      alert('No Login Data found!');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${logInImage})` }}
      ></div>

      <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="md:w-[500px] w-[350px] bg-white/10 backdrop-blur-lg p-12 rounded-xl border border-white/20 shadow-xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-center text-white">Log In</h2>

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
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none bg-white/80"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white font-semibold py-2 px-4 rounded hover:bg-amber-700 transition hover:cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
