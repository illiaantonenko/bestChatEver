import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles/variables.css';
import './styles/global.css';
import { Typography } from './components/Typography';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Typography size='b1'>
          Random <b>text</b>
        </Typography>
      </header>
    </div>
  );
}

export default App;
