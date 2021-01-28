import React from 'react';
import './App.less';
import "antd/dist/antd.dark.css";
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
