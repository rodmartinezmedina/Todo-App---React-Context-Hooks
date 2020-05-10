
//Explanation to the component: Component, ...rest
// https://stackoverflow.com/questions/43484302/what-does-it-mea

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './../contexts/authContext';


const PrivateRoute({ component: Component, ...rest }) {
  return (
    <AuthContext.Consumer> 
      {(context) => {
        const { isLoggedIn } = context;
        return (
        <Route
          {...rest} render={ (props) => { 
            isLoggedIn ? (
              <Component {...props} />
            ) : (
              <Redirect to='/login' />
            )
          }}
          />
        )
      }}
    </AuthContext.Consumer>
  )
}

export default PrivateRoute;
