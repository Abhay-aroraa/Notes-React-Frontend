import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { sendotp,resetPassword } from '../services/noteService';
import Loadercomp from '../components/LoaderComp';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
   const[loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const nvg = useNavigate();

 const handleSendOtp = async () => {
  const start = Date.now();
  setLoading(true);

  try {
    await sendotp(email);
    console.log("Send OTP time:", Date.now() - start, "ms");
    setOtpSent(true);
    setMessage("OTP sent successfully to your email.");
    setError("");
  } catch (err) {
    setError(err.response?.data || "Failed to send OTP");
    setMessage("");
  } finally {
    setLoading(false);
  }
}

  const handleResetPassword = async () => {
     setLoading(true);
    try {
     
      await resetPassword(email, otp, newPassword);
      setMessage('Password reset successfully!');
      setTimeout(() => {
      nvg('/');
    }, 2000);
      setError('');
    } catch (err) {
      setError(err.response?.data || 'Failed to reset password');
      setMessage('');
    }finally{
        
        setLoading(false);
    }
  };

 return (
  <div className="relative min-h-screen bg-gray-900 flex justify-center items-center px-4">
   
    {loading && <Loadercomp />}

  
    <div className="bg-gray-800 p-6 rounded-xl shadow-md w-full max-w-md z-10">
      <h2 className="text-2xl font-semibold text-white text-center mb-4">
        Forgot Password 🔐
      </h2>

      {message && <p className="text-green-400 text-sm mb-2">{message}</p>}
      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
          required
        />
      </div>

      {!otpSent && (
        <button
          onClick={handleSendOtp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg mb-4"
        >
          Send OTP
        </button>
      )}

      {otpSent && (
        <>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 text-sm mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
              required
            />
          </div>

          <button
            onClick={handleResetPassword}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg"
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  </div>
);
};

export default ForgetPassword;
