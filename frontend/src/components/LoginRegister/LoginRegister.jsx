// LoginRegister.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';

const LoginRegister = () => {
  const [isActive, setIsActive] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/register', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });

      const data = await res.json();
      if (data.success) {
        alert('User registered successfully!');
        setRegisterData({ name: '', email: '', password: '' });
        setIsActive(false);
      } else {
        alert('Registration error: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // ← IMPORTANT!
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Login successful:', data);
        navigate('/profile'); // ✅ redirect on success
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login error');
    }
  };


  return (
    /*<div className="container d-flex justify-content-center align-items-center vh-100">*/
    <div style={{ marginTop: '15vh' }}>
      <div className={`content justify-content-center align-items-center d-flex shadow-lg ${isActive ? 'active' : ''}`}>
        
        {/* Register Form */}
        <div className='col-md-6 d-flex justify-content-center'>
          <form onSubmit={handleRegisterSubmit}>
            <div className='header-text mb-4'>
              <h1>Create Account</h1>
            </div>
            <div className='input-group mb-3'>
              <input
                type='text'
                name='name'
                value={registerData.name}
                onChange={handleRegisterChange}
                placeholder='Name'
                className='form-control form-control-lg bg-light fs-6'
                required
              />
            </div>
            <div className='input-group mb-3'>
              <input
                type='email'
                name='email'
                value={registerData.email}
                onChange={handleRegisterChange}
                placeholder='Email'
                className='form-control form-control-lg bg-light fs-6'
                required
              />
            </div>
            <div className='input-group mb-3'>
              <input
                type='password'
                name='password'
                value={registerData.password}
                onChange={handleRegisterChange}
                placeholder='Password'
                className='form-control form-control-lg bg-light fs-6'
                required
              />
            </div>
            <div className='input-group mb-3 justify-content-center'>
              <button type='submit' className='btn border-white text-white w-50 fs-6'>Register</button>
            </div>
          </form>
        </div>

       {/* Login Form */}
        <div className='col-md-6 right-box'>
          <form onSubmit={handleLoginSubmit}>
            <div className='header-text mb-4'>
              <h1>Sign In</h1>
            </div>
            <div className='input-group mb-3'>
              <input
                type='email'
                placeholder='Email'
                className='form-control form-control-lg bg-light fs-6'
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className='input-group mb-3'>
              <input
                type='password'
                placeholder='Password'
                className='form-control form-control-lg bg-light fs-6'
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <div className='input-group mb-5 d-flex justify-content-between'>
              <div className='form-check'>
                <input type='checkbox' className='form-check-input' id='formcheck' />
                <label htmlFor='formcheck' className='form-check-label text-secondary'>
                  <small>Remember Me</small>
                </label>
              </div>
              <div className='forgot'>
                <small><a href='#'>Forgot password?</a></small>
              </div>
            </div>
            <div className='input-group mb-3 justify-content-center'>
              <button type='submit' className='btn border-white text-white w-50 fs-6'>
                Login
              </button>
            </div>
          </form>
        </div>


        {/* Switch Panel */}
        <div className='switch-content'>
          <div className='switch'>
            <div className='switch-panel switch-left'>
              <h1>Hello, Friend!</h1>
              <p>Don't have an account?</p>
              <button className='btn text-white w-50 fs-6' onClick={handleLoginClick}>
                Register
              </button>
            </div>
            <div className='switch-panel switch-right'>
              <h1>Welcome Back!</h1>
              <p>Already have an account?</p>
              <button className='btn text-white w-50 fs-6' onClick={handleRegisterClick}>
                Sign In
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginRegister;
