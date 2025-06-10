import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login({setUser}) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const data = {
    "email":"kmbmevada2343@gmail.com"
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === form.email && u.password === form.password);
    
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      // setUser(user);
      navigate('/home',{state:{user, data}});
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

     <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-3 w-full max-w-md p-8 bg-white border border-gray-300 rounded-xl shadow-lg py-5"
  >
    <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

    <div className="relative mb-4">
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-full border border-gray-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
        
     
    </div>

    <div className="relative mb-4">
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="w-full border border-gray-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
    </div>

    <div className="flex justify-between text-sm mb-6 px-2">
      <label className="flex items-center gap-2">
        <input type="checkbox" className="accent-blue-500" />
        Remember me
      </label>
      <a href="#" className="hover:underline text-white/80">Forgot password?</a>
    </div>

    <button
      type="submit"
      className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md "
    >
      Login
    </button>

    <p className="text-center mt-6 text-black/80 text-sm">
      Don’t have an account?
      <Link to="/Register" className="ml-1 text-black font-semibold underline hover:text-purple-200">
        Register
      </Link>
    </p>
    
  </form>
</div>
  );
}
export default Login;