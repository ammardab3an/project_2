import './App.sass';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CoursesProvider } from './components/CoursesContext';
import SearchBar from './components/search_bar/SearchBar';
import HomePage from './components/home_page/HomePage';
import Footer from './components/footer/Footer'
import CoursePage from './components/course_page/CoursePage';
import NotFound from './components/not_found/NotFound';

function App() {

  return (
    <>

      <SearchBar />

      <CoursesProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course_info/:courseId" element={<CoursePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CoursesProvider>

      <Footer />
    </>
  );
}

export default App;
