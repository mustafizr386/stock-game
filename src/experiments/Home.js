import React, { useState, createElement } from 'react';
import { useSpring, animated } from 'react-spring';
import ReactDOM from "react-dom";
import './Pages.css';
import TypingEffect from './effects/TypingEffect';


const Portfolio = () => {
    const [isHidden, setIsHidden] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [bounce, setDebounce] = useState(false);


    const handleClick = (event) => {

        if (!bounce) {
            setDebounce(true);
            if (event.target.id === "Home") {

                setIsHidden(false);
                const timer = setTimeout(() => {
                    setIsVisible(true);
                }, 1000);
                return () => clearTimeout(timer);
            }
            else if (event.target.id && event.target.tagName == "LI") {

                setIsVisible(false);
                const timer = setTimeout(() => {
                    setIsHidden(true);
                }, 500);
                return () => clearTimeout(timer);
            }
        }
    };


    const fadeOutStyle = {
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-out',
    };


    document.addEventListener('click', handleClick);



    return (
        <div class={isHidden ? "banner" :"bannerHome"}>
            <h1>Mustafiz Rahman</h1>
            <p>The landing page for all things related to me.</p>
            <div class={isHidden ? 'hidden' : ''}>
                <div style={fadeOutStyle}>
                        <div class="textcontainer" style={{textAlign: 'center'}}>
                            <TypingEffect text=" Hello there! I'm Mustafiz Rahman, and I'm thrilled to welcome you to my corner of the internet. Here, you'll find a glimpse into my passions, adventures, and the things that make me tick. Whether you're here out of curiosity or to explore shared interests, I hope you find something that resonates with you." speed={5} />

                        </div>
                </div>
            </div>
        </div>
    );
};


export default Portfolio;