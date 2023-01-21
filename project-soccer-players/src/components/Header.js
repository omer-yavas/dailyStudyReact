import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">SOCCER PLAYER</span>
          <span className="heading-primary--sub">Select Your Player</span>
        </h1>
      </div>
      <div className="header__progress-bar"></div>
    </header>
  );
};

export default Header;
