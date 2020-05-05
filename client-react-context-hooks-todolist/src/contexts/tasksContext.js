import React, { createContext, Component } from 'react';
import axios from 'axios';

export const TasksContext = createContext();

class TasksContextProvider extends Component {
  state = {
    user: null,
    tasks: [],
    name: "",
    description: "",
    axios: axios.create({baseURL: process.env.REACT_APP_API_URL,
      withCredentials })
  }

  componentDidMount = () => {
    this.state.axios
    .get('/auth')
    .then(({data}) => {
      this.setState({ user: data.user })

    })
  }
  // HANDLECHANGE

  // ADD TASK

  // DELETE TASK

  // UPDATE TASK



  render () {
    return (
      <TasksContext.Provider>

      </TasksContext.Provider>
    )
  }


}

export default TasksContextProvider;