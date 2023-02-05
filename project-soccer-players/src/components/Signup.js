import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import './Login.scss';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/login');
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="loginbox">
      <h1>Signup Soccer Players</h1>
      <form>
        <label htmlFor="email-address">Email address</label>
        <input
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email address"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          label="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />

        <button type="submit" onClick={onSubmit}>
          Sign up
        </button>
      </form>
      {errorMessage ? (
        <p className="loginbox_errorMessage">{errorMessage}</p>
      ) : null}
      <p>
        Already have an account? <NavLink to="/login">Login</NavLink>
      </p>
      <p>
        or <NavLink to="/">return main page!</NavLink>
      </p>
    </div>
  );
};

export default Signup;
