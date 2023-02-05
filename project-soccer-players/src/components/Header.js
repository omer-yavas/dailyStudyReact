import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authSliceActions } from '../store/auth-slice';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import Button from 'react-bootstrap/Button';

const Header = () => {
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state) => state.auth.userLoggedIn);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(authSliceActions.changeLoggedInState());
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.log(' An error happened.');
      });
  };

  return (
    <header className="header">
      <div className="header__login">
        {userLoggedIn ? (
          <Button variant="primary" onClick={logoutHandler}>
            Logout
          </Button>
        ) : (
          <>
            <Button variant="primary" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="primary" onClick={() => navigate('/signup')}>
              Signup
            </Button>
          </>
        )}
      </div>

      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">SOCCER PLAYERS</span>
          <span className="heading-primary--sub">
            Get All Statistics About Them
          </span>
        </h1>
      </div>
      <div className="header__progress-bar"></div>
    </header>
  );
};

export default Header;
