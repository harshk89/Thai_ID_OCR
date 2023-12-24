import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import UploadPage from './Components/UploadPage/UploadPage';
import DeletePage from './Components/DeletePage/DeletePage';
import EditPage from './Components/EditPage/EditPage';
import SearchPage from './Components/SearchPage/SearchPage';
import About from './Components/About/About';

function App() {


  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/delete" element={<DeletePage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<About />} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
