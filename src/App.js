import React from 'react';
import './App.css';


import Sidebar from './experiments/Sidebar';
import Home from './experiments/Home';
import Portfolio from './experiments/Portfolio';
import News from './experiments/News';
import Market from './experiments/Market';
import Contact from './experiments/Contact';


function App() {


    return (

        <div className="App">
            
            <Home />
            <Portfolio />
            <News />
            
            <Market />
            
            <Contact />
            <Sidebar />

        </div>
    );

}


export default App;
