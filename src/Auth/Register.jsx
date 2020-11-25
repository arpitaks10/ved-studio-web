import React, { useState } from 'react';
import authSvg from '../assests/auth.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { isAuth } from '../helpers/auth';
import { Redirect } from 'react-router-dom';
import '../Components/Form.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
    textChange: 'Sign Up'
  });

  const { name, email, password1, password2, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: 'Submitting' });
        axios
          .post(`${process.env.REACT_APP_API_URL}/register`, {
            name,
            email,
            password: password1
          })
          .then(res => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Submitted'
            });

            toast.success(res.data.message);
          })
          .catch(err => {
            setFormData({
              ...formData,
              textChange: 'Sign Up'
            });
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <div className = "form">
      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />
      <div className = "form-main">
        <div className = "form-img">

        </div>
        <div className = "form-fields">
          <h1>Sign Up</h1>
          <form
            onSubmit = {handleSubmit}
          >
            <input type = "text" 
              className = "form-input" 
              placeholder = "Name" 
              onChange={handleChange('name')}
              value={name}
            />
            <input type = "email" 
              className = "form-input" 
              placeholder = "Email" 
              onChange={handleChange('email')}
              value={email}
            />
            <input type = "password" 
              className = "form-input" 
              placeholder = "Password" 
              onChange = {handleChange('password1')}
              value = {password1}
            />
            <input type = "password" 
              className = "form-input" 
              placeholder = "Confirm Password" 
              onChange={handleChange('password2')}
              value={password2}
            />
            <button className = "form-button">Sign Up</button>
          </form>
          <div className = "util">
            or
            <a 
              className = "util-link"
              href = "/login"
              target = "_self"
            > Login </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
