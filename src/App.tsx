import React from 'react';
import logo from './logo.svg';
import './App.css';

import Events from './pages/Events';
import SimpleBottomNavigation from './BottomNav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Teams from './pages/Teams';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/events" element={<Events />} />
          <Route path = "/teams" element={<Teams />} />
        </Routes>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </div>
  );
}

export default App;
