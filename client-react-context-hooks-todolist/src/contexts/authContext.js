import React, { createContext, Component } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export class AuthContextProvider extends Component {
  state = {
    user: null,
    username: '',
    email: '',
    password: '',
    confirmPassword:'',
    tasks: [],
    isLoggedIn: false,
    signupError: false,
    loginError: false,
    axios: axios.create({ baseURL: ProcessingInstruction.env.REACT_APP_API_URL,
    withCredentials: true })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value});
  }

  signup = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    
    if(password === confirmPassword) {
    this.state.axios
      .post('/auth/signup', {username, email, password})
      .then(({user}) => this.setState({ isLoggedIn:true, user }))
      .catch(err => this.setState({ isLoggedIn: false }))
    } else {
      this.setState({ signupError:true })
    }
    this.setState({ username: '', email: '', password:'', confirmPassword: '' }) 
  }


  login = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    this.state.axios
      .post('/auth/login', {email, password})
      .then (({user}) => {
        this.setState({ isLoggedIn: true, user })
      })
      .catch(err => {
        this.setState({ isLoggedIn: false, loginError: true })
      })
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