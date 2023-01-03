import './Takimlar.scss';
import bjkLogo from '../assets/BesiktasLogo.png';
import fenerLogo from '../assets/FenerbahceLogo.png';

const Takimlar = (props) => {
  const clickHandlerBjk = () => {
    props.takim('bjk');
  };
  const clickHandlerFb = () => {
    props.takim('fb');
  };

  return (
    <div>
      <img src={bjkLogo} onClick={clickHandlerBjk} alt="besiktas"></img>
      <img src={fenerLogo} onClick={clickHandlerFb} alt="fenerbahce"></img>
    </div>
  );
};

export default Takimlar;
