import './App.sass';
import React from 'react';
import SearchBar from './components/search_bar/SearchBar';
import HomePage from './components/home_page/HomePage';
import Footer from './components/footer/Footer'
import CoursePage from './components/course_page/CoursePage';
import { Routes, Route, Link } from 'react-router-dom';

function App() {

  const [filter_string, set_filter_string] = React.useState('');
  
  return (
    <>

      <SearchBar filterStringSetter={set_filter_string} />

      <Routes>
        <Route path="/" element={<HomePage filterString={filter_string} />} />
        <Route path="/course_info/:courseId" element={<CoursePage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
