import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginIsValid } from '../features/user/UserSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  //const [authenticated, setauthenticated] = useState(false);
  const authentication = useSelector((state) => state.user.authenticated);
  const [wrongInput, setWrongInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkLoginIsValid({ username: username, password: password }));
    setusername('');
    setpassword('');
  };

  useEffect(() => {
    if (authentication === true) {
      navigate('/homepage');
    } else if (authentication === true) {
      setWrongInput(true);
    }
  }, [authentication]);

  return (
    <div className="loginBox">
      <h3>Kullanıcı Adı ve Şifrenizi Giriniz!</h3>
      <Form onSubmit={handleSubmit} className="loginform">
        <Form.Label>Kullanıcı Adı</Form.Label>
        <Form.Control
          type="text"
          name="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <Form.Label>Şifre </Form.Label>
        <Form.Control
          type="password"
          name="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
          {' '}
        <Button variant="primary" type="submit">
          Giriş Yap
        </Button>
      </Form>
      {wrongInput ? <p>Hatalı Giriş</p> : null}
    </div>
  );
};

export default LoginPage;
