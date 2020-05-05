import React, { createContext, Component } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
  state = {
    user
    tasks
    isLoggedIn
    username
    email
    password: '',
    axios: axios.create({ baseURL: ProcessingInstruction.env.REACT_APP_API_URL,
    withCredentials: true })
  }

  handleChange = () => {

  }

  signup = e => {

  }

  login = e => {

  }

  logout = e => {
    this.state.axios
      .post('/auth/logout', {})
      .then(({data}) => data);
    this.setState({isLoggedIn: false, user: null})

  }

  render() {
    return (
      <AuthContext.Provider value={{
        ...this.state,
        handleChange: this.handleChange
        signup: this.signup,
        login: this.login,
        logout: this.logout
      }}>
      {this.props.children}
      </AuthContext.Provider>
    );
  };

};


export default AuthContextProvider;