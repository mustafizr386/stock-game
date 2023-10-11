import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './App.css';


import Sidebar from './experiments/Sidebar';
import Banner from './experiments/Banner';
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
