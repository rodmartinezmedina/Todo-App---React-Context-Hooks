import React, { createContext, Component } from 'react';
import axios from 'axios';

export const TasksContext = createContext();

class TasksContextProvider extends Component {
  state = {
    user: null,
    tasks: [],
    name: "",
    description: "",
    isDone : false
    axios: axios.create({baseURL: process.env.REACT_APP_API_URL,
      withCredentials })
  }

  componentDidMount = () => {
    this.state.axios
    .get('/auth')
    .then(({data}) => {
      this.setState({ user: data.username, tasks: data.tasks })
    });
  }

  // HANDLECHANGE
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value});
  };

  // ADD TASK
  addTask = (event) => {
    event.preventDefault();
    const { name, description } = this.state;
    let createdDate = new Date().toDateString();

    this.state.axios
      .post('/tasks', {name, description, createdDate })
      .then(({data}) => {
        let tasks = [...this.state.tasks, data];
        this.setState({name: '', description: '', tasks });        
      })
      .catch(err => console.log(err));
  };

  // DELETE TASK
  deleteTask = (id) => {
    this.state.axios
      .delete(`/tasks/${id}`, {})
      .then(({data}) => {
        let tasks = this.state.tasks.filter(oneTask => {
          return oneTask._id !== id
        })
        this.setState({ name: '', description:'', tasks})
      })
      .catch(err => console.log(err))
  };

  // UPDATE TASK
  updateTask = (id) => {
    const { name, description } = this.state;
    
    this.state.axios
      .put(`/tasks/${id}`, {name, description})
      .then(({data}) => {
        let task = this.state.tasks.filter(oneTask => {
          return id === oneTask._id
        })
        // ???????
        this.setState({ name: '', description: '', tasks: [...this.state.tasks, task]});
      })
      .catch(err => console.log(err))
  }


  doneTaskFunc = (oneTask) => {
    const { _id, name, description } = oneTask;
    this.state.axios  
      .put(`/tasks/${_id}`, {name, description, taskDone: true})
      .then(({data}) => {
        let task = this.state.tasks.filter(oneTask => {
          return _id === oneTodo._id
        })
        todo[0].taskDone = true;
        this.setState({tasks: [...this.state.tasks, task]});
      })
      .catch(err => console.log(err))
  }


  render () {
    return (
      <TasksContext.Provider value={{
        handleChange: this.handleChange,
        addTodo: this.addTask,
        updateTask: this.updateTask,
        deleteTask: this.deleteTask,
        doneTaskFunc:this.doneTaskFunc
      }}>
      {this.props.children}
      </TasksContext.Provider>
    );
  };
};

export default TasksContextProvider;