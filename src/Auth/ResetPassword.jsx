import React, { useState, useEffect } from 'react';
import authSvg from '../assests/reset.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import '../Style/Form.css';
import IsLoading from "../Components/Loader/Loading";

const ResetPassword = ({ match }) => {
  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
    token: ''
  });
  const { password1, password2, token } = formData;

  useEffect(() => {
    let token = match.params.token
    if (token) {
      setFormData({ ...formData, token, })
    }

  }, [])


  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };


  const handleSubmit = e => {
    console.log(password1, password2)
    e.preventDefault();
    if ((password1 === password2) && password1 && password2) {

      axios
        .put(`${process.env.REACT_APP_API_URL}/resetpassword`, {
          newPassword: password1,
          resetPasswordLink: token
        })
        .then(res => {
          console.log(res.data.message)
          setFormData({
            ...formData,
            password1: '',
            password2: ''
          });
          toast.success(res.data.message);

        })
        .catch(err => {
          toast.error('Something is wrong try again');
        });
    } else {
      toast.error('Passwords don\'t matches');
    }
  };


  return (
    <div className = "form">
      <ToastContainer />
      <div className = "form-main">
        <div className = "form-img">

        </div>
        <div className = "form-fields">
          <h1>Reset you password</h1>
          <form
            onSubmit = {handleSubmit}
          >
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
            <button type = "submit" className = "form-button">Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IsLoading(ResetPassword);
