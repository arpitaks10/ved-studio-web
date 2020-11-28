import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import '../Style/Form.css';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import IsLoading from "../Components/Loader/Loading";

export const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'Login'
  });
  const { email, password1, textChange } = formData;
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

    <div className="form">
      {isAuth() ? <Redirect to='/private' /> : null}
      <ToastContainer />
      <div className="form-main">
        <div className="form-img">

        </div>
        <div className="form-fields">
          <h1>Login</h1>
          <form
            onSubmit={handleSubmit}
          >
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
            <button className="form-button">Login</button>
            <Link
              to="/users/password/forget"
              className="util-link"
            >
              Forget password?
            </Link> OR
          </form>
          <div className="external-login">
              <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                  <Link
                    onClick={renderProps.onClick}
                    className="fb-login-link"
                  >
                    Sign in with Facebook
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
                    className="fb-login-link"
                  >
                    Sign in with Google
                  </Link>
                )}
              ></GoogleLogin>
            </div>
          <div className="util">
            New Here?
            <a
              className="util-link"
              href="/register"
              target="_self"
            > Sign Up </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsLoading(Login);