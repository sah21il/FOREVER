
import axios from 'axios'
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const onSubmitHandler=async(e)=>{
        try {
            e.preventDefault();
            console.log(email,password)

            const response=await axios.post(backendUrl+`/api/user/admin`,{email,password})
            console.log(response);
            if(response.data.success){
                setToken(response.data.token);

            }
            else{
                toast.error(response.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error);
            
        }
    }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Panel</h1>
        <form className="space-y-5" onSubmit={onSubmitHandler}>
          <div>
            <p className="block text-sm font-medium text-gray-600 mb-1">Email</p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          </div>
          <div>
            <p className="block text-sm font-medium text-gray-600 mb-1">Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Enter your password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
          </div>
          <button type="submit" className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
