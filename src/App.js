import React from 'react';
import './App.css';


import Sidebar from './experiments/Sidebar';
import Home from './experiments/Home';
import AboutMe from './experiments/About Me';
import Skills from './experiments/Skills';
import Hobbies from './experiments/Hobbies';
import Contact from './experiments/Contact';


function App() {


    return (

        <div className="App">
            
            <Home />
            <AboutMe />
            <Skills />
            
            <Hobbies />
            
            <Contact />
            <Sidebar />

        </div>
    );

}


export default App;
