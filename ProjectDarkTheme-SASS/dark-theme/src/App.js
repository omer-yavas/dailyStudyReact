import data from './data';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState('light-theme');

  const toggleTheme = () => {
    if (theme === 'light-theme') {
      setTheme('dark-theme');
    } else {
      setTheme('light-theme');
    }
  };
  document.documentElement.className = theme;

  return (
    <div>
      <nav>
        <div className="nav-center">
          <h1>World Cup - Dark/Light Theme</h1>
          <button className="btn" onClick={toggleTheme}>
            toggle
          </button>
        </div>
      </nav>
      <section className="articles">
        {data.map((item) => {
          return (
            <article className="match">
              <h2>{item.title}</h2>
              <div className="match-info">
                <span>{item.score}</span>
              </div>
              <p>{item.level}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default App;
