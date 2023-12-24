import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
