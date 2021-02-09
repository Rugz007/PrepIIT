import React from 'react';
import './App.less';
import "antd/dist/antd.dark.css";
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import AOS from "aos";
import 'aos/dist/aos.css';
import Routes from './routes';
import { Footer } from './components/Footer';
AOS.init();
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
