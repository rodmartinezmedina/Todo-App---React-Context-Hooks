import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";


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

          </Switch>
        </TasksContextProvider>
      </AuthContextProvider>

    </div>
  );
}

export default App;
