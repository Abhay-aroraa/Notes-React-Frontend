import React, { useState } from 'react';
import { register } from '../services/noteService';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(email, password);
      setSuccess('Registration successful!');
      setError('');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Registration failed');
      setSuccess('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#202124] flex justify-center items-center px-4">
      <div className="bg-[#1f1f1f] p-8 sm:p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Create an Account 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-1">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error or Success Message */}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 py-2 rounded-lg text-white font-semibold text-lg shadow-md"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?
          <button
            onClick={() => navigate('/')}
            className="ml-1 text-blue-400 hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
