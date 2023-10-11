import React, { useState, createElement } from 'react';
import { useSpring, animated } from 'react-spring';
import ReactDOM from "react-dom";
import './Pages.css';
import TypingEffect from './effects/TypingEffect';

const AboutMe = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [bounce, setDebounce] = useState(false);


    const handleClick = (event) => {
        if (!bounce) {

            setDebounce(true);
            if (event.target.id == "About Me") {

                setIsHidden(false);
                const timer = setTimeout(() => {
                    setIsVisible(true);
                }, 1000);

            }
            else if (event.target.id && event.target.tagName == "LI") {

                setIsVisible(false);
                const timer = setTimeout(() => {
                    setIsHidden(true);
                }, 500);

            }
        }
    };


    const fadeOutStyle = {
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-out'
    };

    document.addEventListener('click', handleClick);

    return (

        <div class={isHidden ? 'hidden' : ''}>
            <div style={fadeOutStyle}>

                <div class="container" style={{ width: "800" }}>
                    <div class="textcontainer">
                        <p>
                        I'm a NOVA based software developer & cyber security engineer that's currently building a web-based video game that simulates trading in the stock market against AI. I've spent the last 4 years creating a variety of tools and applications for a wide variety of customers ranging from simple accounting tools to a full-on store front. I've mostly focused on the full stack development on these applications and primarily spent my time with server management and setting up secure operations.
                        </p>
                        <p>
                            For the most part now I've been expanding my skills in cyber security and software development by participating in CTFs and creating small applications and videogames in my spare time.
                        </p>
                        <p>
                        If I'm not busy building on my technical skills, I like to maintain my car and my lawn, go to the gym to do some bouldering and weightlifting, and occasionally I'll get my angle grinder and MIG welder to chop and reweld some scrap steel for practice. 
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};


export default AboutMe;