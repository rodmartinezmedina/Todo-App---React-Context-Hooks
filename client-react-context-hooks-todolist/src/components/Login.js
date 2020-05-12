import React from 'react';
import { AuthContext } from '../contexts/authContext';

const Login =() => {
  return (
    <AuthContext.Consumer>
    { (context) => {
      const { password, email, login, loginError, handleChange } = context;
      return (
        <div className='form-container'>
          <h1 className='form-title'>Login</h1>

          <form onSubmit={login}>

            <div className='form-group'>
              <label>Email:</label>
              <input
              type='email'
              name='email'
              value={email}
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

            <button className='submit-btn' type='submit'>Login</button>
          </form>

          </div>
      )
    }}
    </AuthContext.Consumer>
  )
}

export default Login;