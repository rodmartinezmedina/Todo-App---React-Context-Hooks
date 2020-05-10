import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

const Signup =() => {
  return (
    <AuthContext.Consumer>
    { (context) => {
      const { password, confirmPassword, username, signup, signupError, handleChange } = context;
      return (
        <div className='form-container'>
          <h1 className='form-title'>Signup</h1>

          <form onSubmit={signup}>
            <div className='form-group'>
              <label>Username:</label>
              <input
              type='text'
              name='username'
              value={username}
              onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label>Password:</label>
              <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
              />
            </div>

            <div className='form-group'>
              <label>Confirm Password:</label>
              <input
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleChange}
              />
            </div>
            <button className='submit-btn' type='submit'>Signup</button>
          </form>

          </div>


      )
    }}
    </AuthContext.Consumer>
  )
}

export default Signup