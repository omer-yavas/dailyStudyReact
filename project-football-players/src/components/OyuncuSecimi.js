import Takimlar from './Takimlar';
import TakimListesi from './TakimListesi';
import { useState } from 'react';
import './OyuncuSecimi.scss';

const OyuncuSecimi = (props) => {
  const [listeCikar, setListeCikar] = useState(null);

  const takimSecimi = (abc) => {
    if (abc === 'bjk') {
      setListeCikar('besiktas');
    } else if (abc === 'fb') {
      setListeCikar('fenerbahce');
    }
  };

  const secilenOyuncu = (oyuncu) => {
    props.secilenOyuncu(`${listeCikar}/${oyuncu}`);
  };

  return (
    <div className="takimVeListesi">
      <Takimlar takim={takimSecimi}></Takimlar>
      {listeCikar ? (
        <TakimListesi liste={listeCikar} secilen={secilenOyuncu}></TakimListesi>
      ) : null}
    </div>
  );
};

export default OyuncuSecimi;
