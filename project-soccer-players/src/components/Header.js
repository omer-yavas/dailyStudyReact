import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div class="header__text-box">
        <h1 class="heading-primary">
          <span class="heading-primary--main">SOCCER PLAYER</span>
          <span class="heading-primary--sub">Select Your Player</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
