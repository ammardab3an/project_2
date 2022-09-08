import './App.sass';
import React from 'react';
import SearchBar from './components/search_bar/SearchBar';
import HomePage from './components/home_page/HomePage';
import Footer from './components/footer/Footer'
import CoursePage from './components/course_page/CoursePage';
import { Routes, Route } from 'react-router-dom';
import { CoursesProvider } from './components/CoursesContext';

function App() {

  return (
    <>

      <SearchBar />

      <CoursesProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course_info/:courseId" element={<CoursePage />} />
        </Routes>
      </CoursesProvider>

      <Footer />
    </>
  );
}

export default App;
