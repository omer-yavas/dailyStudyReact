import './Header.scss';

const Header = () => {
  return (
    <header className="header">
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
