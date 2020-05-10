import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';

import AuthContextProvider from './contexts/authContext';
import TasksContextProvider from './contexts/tasksContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <TasksContextProvider>
          <Navbar />
          <Switch>

          </Switch>
        </TasksContextProvider>
      </AuthContextProvider>

    </div>
  );
}

export default App;
