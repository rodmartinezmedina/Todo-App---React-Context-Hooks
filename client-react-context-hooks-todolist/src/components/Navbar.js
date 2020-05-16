import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';

const Navbar = () => {
  return (
    <AuthContext.Consumer> 
    {(context) => {
      const { isLoggedIn, logout } = context;
      
      return (
        <div>
        <nav className='navbar'>          
          <div className='home' className='navbar-e'>
            <Link to={'/'}>Home / Brand Logo</Link>
          </div>

          { isLoggedIn ? 
            (
            <>
              <div className='navbar-e'>
                <Link to={'/add'}>
                  <button className='nav-btn'>Add Tasks</button>
                </Link>
              </div>
              <div className='navbar-e'>
                <button className='nav-btn' onClick={logout}>Logout</button>
              </div>
            </>
            ) : 
            (
            <>
              <div className='navbar-e'>
                <Link to={'/login'}>Login</Link>
              </div>
              <div className='navbar-e'>
                <Link to={'/signup'}>Signup</Link>
              </div>
              </>         
            )
          }
          </nav>
        </div>
      )    
    }}
    </AuthContext.Consumer> 
  )
}


export default Navbar;