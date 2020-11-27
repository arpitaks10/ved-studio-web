import React, { useState } from 'react';
import authSvg from '../assests/forget.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import '../Style/Form.css';

const ForgetPassword = ({history}) => {
  const [formData, setFormData] = useState({
    email: ''
  });


  const { email } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };


  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/forgotpassword`, {
          email
        })
        .then(res => {
          
            setFormData({
              ...formData,
              email: '',
            });
            toast.success(`Please check your email`);
          
        })
        .catch(err => {
        console.log(err.response)
          toast.error(err.response.data.error);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };

  
  return (
    <div className = "form">
      <ToastContainer />
      <div className = "form-main">
        <div className = "form-img">

        </div>
        <div className = "form-fields">
          <h1>Forget Password ?</h1>
          <form
            onSubmit = {handleSubmit}
          >
            <input type = "email" 
              className = "form-input" 
              placeholder = "Email" 
              onChange={handleChange('email')}
              value={email}
            />
            <button type = "submit" className = "form-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
 