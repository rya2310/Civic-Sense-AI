import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { AuthContextUse } from '../context/AuthContext';

const SignUpForm = () => {

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  const {user,setUser}=AuthContextUse()


  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your form submission logic here
    if(!name || !email || !password){
      alert('Please fill in all fields')
      return;
    }

    try {
      const res=await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signup`,{
        name,
        email,
        password
      })
      if(res.status===201){
        setUser(res.data.user)
        localStorage.setItem('token',res.data.token)
        navigate('/')
      }
    } catch (error) {
      console.error(error) ;
    }

    
    console.log('Sign Up Form Submitted');
  };

  return (
    <div className=" flex items-center justify-center shadow-md bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rounded-xl">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#22C55E] focus:border-[#22C55E] focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>

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
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#22C55E] focus:border-[#22C55E] focus:z-10 sm:text-sm"
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
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#22C55E] focus:border-[#22C55E] focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#22C55E] hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#22C55E]"
            >
              Sign Up
            </button>
            <p className='mt-4 text-md'>If already have an Account <Link to="/login" className='text-blue-500 underline'>Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;