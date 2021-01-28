import React from 'react';
import './App.less';
import "antd/dist/antd.dark.css";
import { HomePage } from './views/HomePage/HomePage';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <HomePage />
      </Router>
    </div>
  );
}

export default App;
