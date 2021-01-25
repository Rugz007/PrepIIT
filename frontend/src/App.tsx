import React from 'react';
import './App.less';
import "antd/dist/antd.css";
import { HomePage } from './views/HomePage/HomePage';
import { Navbar } from './components/Navbar';
function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
