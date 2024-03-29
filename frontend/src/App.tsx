import React, { useContext, useEffect } from "react";
import './App.less';
import { Navbar } from './components/Navbar';
import AOS from "aos";
import 'aos/dist/aos.css';
import Routes from './routes';
import { Footer } from './components/Footer';
import UserContext from "./context/User/UserContext";
import { BrowserRouter as Router } from 'react-router-dom';

AOS.init();
function App() {
  const userContext = useContext<any>(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      userContext.loadUser();
    }
  }, []);
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
