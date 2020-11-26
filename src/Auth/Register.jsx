import React, { useState } from 'react';
import authSvg from '../assests/auth.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { isAuth, authenticate } from '../helpers/auth';
import { Redirect, Link } from 'react-router-dom';
import '../Components/Form.css';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

const Register = ({ history }) => {
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

  const sendGoogleToken = tokenId => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };
  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin/dashboard')
        : history.push('/user/dashboard');
    });
  };
  const responseGoogle = response => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };


  //function which is called in callback
  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/facebooklogin`, {
        userID,
        accessToken
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
        toast.success('signin succesfully done');
      })
      .catch(error => {
        console.log('facebook SIGNIN ERROR', error.response);
        toast.error(error.response.data.error);
      });
  };
  //callback of button of facebook
  const responseFacebook = response => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken)
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
    <div className="form">
      {isAuth() ? <Redirect to='/' /> : null}
      <ToastContainer />
      <div className="form-main">
        <div className="form-img">

        </div>
        <div className="form-fields">
          <h1>Sign Up</h1>
          <form
            onSubmit={handleSubmit}
          >
            <input type="text"
              className="form-input"
              placeholder="Name"
              onChange={handleChange('name')}
              value={name}
            />
            <input type="email"
              className="form-input"
              placeholder="Email"
              onChange={handleChange('email')}
              value={email}
            />
            <input type="password"
              className="form-input"
              placeholder="Password"
              onChange={handleChange('password1')}
              value={password1}
            />
            <input type="password"
              className="form-input"
              placeholder="Confirm Password"
              onChange={handleChange('password2')}
              value={password2}
            />

            <FacebookLogin
              appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
              autoLoad={false}
              callback={responseFacebook}
              render={renderProps => (
                <Link
                  onClick={renderProps.onClick}
                  className='bg-primary m-1 text-light btn'
                >

                  <span>
                    <i className='fa fa-lg m-0 fa-facebook' /> Sign In with Facebook</span>
                </Link>
              )}
            ></FacebookLogin>
            <GoogleLogin
              clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <Link
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className='text-light btn m-1' style={{ 'background-color': 'rgb(219,68,55)' }}
                >

                  <span>
                    <i className='fa fa-lg fa-google' /> Sign In with Google</span>

                </Link>
              )}
            ></GoogleLogin>

            <button className="form-button">Sign Up</button>
          </form>
          <div className="util">
            or
            <a
              className="util-link"
              href="/login"
              target="_self"
            > Login </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
