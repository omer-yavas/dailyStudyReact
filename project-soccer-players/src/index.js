import React from 'react';
import ReactDOM from 'react-dom';
import { TeamsProvider } from './context/teams_context';
import { PlayersProvider } from './context/players_context';
import './index.css';
import App from './App';

ReactDOM.render(
  <TeamsProvider>
    <PlayersProvider>
      <App />
    </PlayersProvider>
  </TeamsProvider>,
  document.getElementById('root')
);
