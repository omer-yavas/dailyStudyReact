import Takimlar from './Takimlar';
import TakimListesi from './TakimListesi';
import { useState } from 'react';

const OyuncuSecimi = () => {
  const [listeCikar, setListeCikar] = useState(null);

  const takimSecimi = (abc) => {
    if (abc === 'bjk') {
      setListeCikar('besiktas');
    } else if (abc === 'fb') {
      setListeCikar('fenerbahce');
    }
  };

  return (
    <div>
      <Takimlar takim={takimSecimi}></Takimlar>
      {listeCikar ? <TakimListesi liste={listeCikar}></TakimListesi> : null}
    </div>
  );
};

export default OyuncuSecimi;
