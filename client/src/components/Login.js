import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Login = () => {
  const [ user, setUser ] = useState({ username: '', password: ''});
  const { push } = useHistory();

  const handleChange = e => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', user)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        push('/bubbles')
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            placeholder="username"
            value={user.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            name="password"
            placeholder="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
