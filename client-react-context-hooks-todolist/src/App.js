import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import AuthContextProvider from './contexts/authContext';
import TasksContextProvider from './contexts/tasksContext';

function App() {
  return (
    <div className="App">

      <AuthContextProvider>
        <TasksContextProvider>
          <Navbar />
          <Switch>
          <Route exact path='/' component={Home} />
          <AnonRoute exact path='/signup' component={Signup}/>
          <AnonRoute exact path='/login' component={Login}/>


          </Switch>
        </TasksContextProvider>
      </AuthContextProvider>

    </div>
  );
}

export default App;
