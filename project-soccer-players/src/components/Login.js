import React, { useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import { useNavigate, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authSliceActions } from '../store/auth-slice';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(authSliceActions.changeLoggedInState());
        const user = userCredential.user;
        navigate('/');
        console.log(user);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.log(error.message);
      });
  };

  // const check = () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       console.log('uid', uid);
  //     } else {
  //       console.log('user is logged out');
  //     }
  //   });
  // };

  return (
    <div className="loginbox">
      <h1>Login Soccer Players</h1>
      <form>
        <label htmlFor="email-address">Email address</label>

        <input
          id="email-address"
          name="email"
          type="email"
          required
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>

        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage ? (
          <p className="loginbox_errorMessage">Wrong! Try again.</p>
        ) : null}
        <div>
          <button onClick={onLogin}>Login</button>
        </div>
      </form>

      <p>
        No account yet? <NavLink to="/signup">Signup</NavLink>
      </p>
      <p>
        or <NavLink to="/">return main page!</NavLink>
      </p>
    </div>
  );
};

export default Login;
