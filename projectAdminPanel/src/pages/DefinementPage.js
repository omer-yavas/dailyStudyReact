import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import DefineSectionTable from '../components/DefineSectionTable';
import DefinePersonel from '../components/DefinePersonel';

const DefinementPage = () => {
  const [activePart, setActivePart] = useState('section&table');

  return (
    <div>
      <h3>Tanımlama Ekranı</h3>
      <div className="definePageMasterButtons">
        <Button
          variant="primary"
          onClick={() => setActivePart('section&table')}
        >
          Bölüm-Masa Ekle/Sil
        </Button>
        <Button variant="primary" onClick={() => setActivePart('personel')}>
          Personel Ekle/Sil
        </Button>
      </div>
      {activePart === 'section&table' ? (
        <DefineSectionTable></DefineSectionTable>
      ) : (
        <DefinePersonel></DefinePersonel>
      )}

      <p>İndirim ve Limit Tanımlama Componenti- Ayrı yere taşınabilir</p>
    </div>
  );
};

export default DefinementPage;
