import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import '../Style/Form.css';

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Login'
  });
  const { email, password1, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = e => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Setting up things !' });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password1
        })
        .then(res => {
          authenticate(res, () => {
            setFormData({
              ...formData,
              email: '',
              password1: '',
              textChange: 'Good to go'
            });
            isAuth() && isAuth().role === 'admin'
              ? history.push('/admin')
              : history.push('/private');
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
          });
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Login'
          });
          console.log(err.response);
          toast.error(err.response.data.message);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <div className = "form">
      {isAuth() ? <Redirect to='/private' /> : null}
      <ToastContainer />
      <div className = "form-main">
        <div className = "form-img">

        </div>
        <div className = "form-fields">
          <h1>Login</h1>
          <form
            onSubmit = {handleSubmit}
          >
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
            <button type = "submit" className = "form-button">{textChange}</button>
            <Link
              to="/users/password/forget"
              className = "util-link"
            >
              Forget password?
            </Link>
          </form>
          <div className = "util">
            New Here?
            <a 
              className = "util-link"
              href = "/register"
              target = "_self"
            > Sign Up </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;