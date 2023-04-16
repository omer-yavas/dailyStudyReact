import { useDispatch, useSelector } from 'react-redux';
import { GrLogout } from 'react-icons/gr';
import { logoutUser } from '../features/user/UserSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.validUserName);

  const handleLogout = () => {
    dispatch(logoutUser(currentUser));
    navigate('/login');
  };

  return (
    <div className="header">
      <div>Hoşgeldin {currentUser}, </div>
      <div onClick={handleLogout} className="header_logout">
        Çıkış
        <GrLogout />
      </div>
    </div>
  );
};

export default Header;
