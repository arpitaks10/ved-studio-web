import React, { useState, useEffect } from 'react';
import authSvg from '../assests/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import '../Style/Form.css';
import '../Style/Dashboard.css';
import IsLoading from "../Components/Loader/Loading";

export const Private = ({ history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    textChange: 'Update',
    role: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const token = getCookie('token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const { role, name, email } = res.data;
        setFormData({ ...formData, role, name, email });
      })
      .catch(err => {
        toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            history.push('/login');
          });
        }
      });
  };
  const { name, email, password1, textChange, role } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    const token = getCookie('token');
    console.log(token);
    e.preventDefault();
    setFormData({ ...formData, textChange: 'Submitting' });
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/user/update`,
        {
          name,
          email,
          password: password1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        updateUser(res, () => {
          toast.success('Profile Updated Successfully');
          setFormData({ ...formData, textChange: 'Update' });
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  return (
    <div className='private-main'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
          <div className='form-fields'>
            <h1>
              Welcome {name}
            </h1>
            <form
              className='w-full flex-1 mt-8 text-indigo-500'
              onSubmit={handleSubmit}
            >
              <div className='mx-auto max-w-xs relative '>
                <input
                  className='form-input'
                  type='email'
                  placeholder='Email'
                  disabled
                  value={email}
                />
                <input
                  className='form-input'
                  type='text'
                  placeholder='Name'
                  onChange={handleChange('name')}
                  value={name}
                />

                <input
                  className='form-input'
                  type='password'
                  placeholder='Password'
                  onChange={handleChange('password1')}
                  value={password1}
                />
                <button
                  type='submit'
                  className='form-button'
                > {textChange} </button>
              </div>
              <div className='util'>
                Go to 
                <a
                  className='util-link'
                  href='/'
                  target='_self'
                > Home </a>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
};

export default IsLoading(Private);
