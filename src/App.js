import './App.sass';
import React from 'react';
import SearchBar from './components/search_bar/SearchBar';
import HomePage from './components/home_page/HomePage';
import Footer from './components/footer/Footer'

function App() {

    const [filter_string, set_filter_string] = React.useState('');

    return (
        <>
            <SearchBar filterStringSetter={set_filter_string}/>
            <HomePage filterString={filter_string}/>
            <Footer />
        </>
    );
}

export default App;
