import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContextUse } from '../context/AuthContext';
const SignInForm = () => {
  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');
  const navigate = useNavigate();
  const {user,setUser}=AuthContextUse()

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your form submission logic here
    if(!email || !password){
      alert('Please fill in all fields');
      return
    }

    try {
      const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signin`,{
        email,
        password
      })

      if(res.status===200){
        setUser(res.data.user)
        localStorage.setItem('token',res.data.token)
        alert('Sign in successful')
        navigate('/')
        }
    } catch (error) {
      console.log("errir:",error);
      
    }

    console.log('Sign In Form Submitted');
  };

  return (
    <div className=" flex items-center rounded-xl shadow-md justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#22C55E] focus:border-[#22C55E] focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#22C55E] focus:border-[#22C55E] focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#16A34A] focus:ring-[#22C55E] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#16A34A] hover:text-[#22C55E]">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Sign In Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#16A34A] hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22C55E]"
            >
              Sign In
            </button>
          </div>
          <p className="  text-md">Not have an account  | <Link className="text-blue-500  underline" to="/register">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;