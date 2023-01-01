import { useState } from 'react';
import Context from './store/context';
import Firebase from './components/Firebase';
import OyuncuSecimi from './components/OyuncuSecimi';
function App() {
  const [data, setData] = useState([]);

  return (
    <div>
      <Context.Provider value={Context}>
        <h1> Takımını Seç, Favori Oyuncunu Görüntüle</h1>
        <div className="main">
          <OyuncuSecimi></OyuncuSecimi>
          <Firebase />
        </div>
      </Context.Provider>
    </div>
  );
}

export default App;
