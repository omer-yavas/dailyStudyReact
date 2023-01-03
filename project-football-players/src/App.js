import { useState } from 'react';
import Firebase from './components/Firebase';
import OyuncuSecimi from './components/OyuncuSecimi';
import './App.scss';
function App() {
  const [data, setData] = useState([]);
  const [goruntulenecek, setGoruntulenecek] = useState('');

  return (
    <div>
      <h1> Takımını Seç, Favori Oyuncunu Görüntüle</h1>
      <div className="main">
        <OyuncuSecimi
          secilenOyuncu={(oyuncu) => setGoruntulenecek(oyuncu)}
        ></OyuncuSecimi>
        {goruntulenecek ? <Firebase goruntule={goruntulenecek} /> : null}
      </div>
    </div>
  );
}

export default App;
