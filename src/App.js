import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Activate from './Auth/Activate';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgetPassword from './Auth/ForgetPassword';
import ResetPassword from './Auth/ResetPassword';
import Admin from './Auth/Admin'
import Private from './Auth/Private'
import Adminsection from './helpers/AdminRoute'
import Privatesection from './helpers/PrivateRoute'

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact render={props => <Home {...props} />} />
          <Route path='/register' exact render={props => <Register {...props} />} />
          <Route path='/login' exact render={props => <Login {...props} />} />
          <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
          <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
          <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
          <Privatesection path='/private' exact component={Private} />
          <Adminsection path='/admin' exact component={Admin} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;