import './App.sass';
import React from 'react';
import SearchBar from './components/search_bar/SearchBar';
import HomePage from './components/home_page/HomePage';
import Footer from './components/footer/Footer'
import CoursePage from './components/course_page/CoursePage';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>

      <SearchBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course_info/:courseId" element={<CoursePage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
