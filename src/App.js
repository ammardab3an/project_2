import './App.sass';
import React from 'react';
import SearchBar from './components/SearchBar';
import Landing from './components/Landing';
import Courses from './components/Courses';
import Footer from './components/Footer';

function App() {

    const [filter_string, set_filter_string] = React.useState('');

    return (
        <>
            <SearchBar filterStringSetter={set_filter_string}/>
            <Landing />
            <Courses filterString={filter_string}/>
            <Footer />
        </>
    );
}

export default App;
