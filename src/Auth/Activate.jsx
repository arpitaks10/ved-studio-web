import React, { useState, useEffect } from 'react';
import authSvg from '../assests/welcome.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {  isAuth } from '../helpers/auth';
import {  Redirect } from 'react-router-dom';
import "../Style/Activate.css";
import "../Style/Form.css";

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    name: '',
    token: ''
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }

    console.log(token, name);
  }, [match.params]);

  
  const { name, token} = formData;

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API_URL}/activation`, {
        token
      })
      .then(res => {
        setFormData({
          ...formData,
          show: false
        });

        toast.success(res.data.message);
      })
      .catch(err => {
        
        toast.error(err.response.data.errors);
      });
  };

  return (
    <div className = "activate-main">
      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />
      <div className = "activate-card">
        <h1> Welcome {name} </h1>
        <form
          onSubmit={handleSubmit}
        >
          <div className = "card-content">
            <button
              type='submit'
              className = "form-button"
            >
              Click here to activate your account
            </button>
          </div>
          <div className = "card-content">
            OR 
            <a
              className = "util-link"
              href = "/register"
              target = "_self"
            > Sign Up </a>
            again
          </div>
        </form>
      </div>
    </div>
  );
};

export default Activate;
