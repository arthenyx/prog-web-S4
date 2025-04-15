import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './styles/main.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import StyleMatcher from "./pages/StyleMatcher";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import ArtworkDetails from "./pages/ArtworkDetails";

function App() {
  return (
    <Router>
      {/* Header + Navigation */}
      <Header />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/style-matcher" element={<StyleMatcher />} />
        <Route path="/about" element={<About />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/artwork/:artworkId" element={<ArtworkDetails />} />
      </Routes>
      
      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
