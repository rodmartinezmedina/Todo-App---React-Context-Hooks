import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './../contexts/authContext';


const AnonRoute = ({ component: Component, ...rest}) => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        const { isLoggedIn } = context;
        return (
          <Route
            {...rest} render={ (props) => { return (
              isLoggedIn ? (
                <Redirect to='/mytasks' />
              ) : (
                <Component {...props} />
              )
            )
            }}
          />
        )
      }}
    </AuthContext.Consumer>
  )
}

export default AnonRoute;