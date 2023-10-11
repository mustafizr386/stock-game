/* global google */
import React, { useState, createElement } from 'react';
import { useSpring, animated } from 'react-spring';
import ReactDOM from "react-dom";
import './Pages.css';
import TypingEffect from './effects/TypingEffect';


const Contact = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [bounce, setDebounce] = useState(false);



    const handleClick = (event) => {
        if (!bounce) {
            setDebounce(true);
            if (event.target.id == "Contact") {

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
                        <p>If this website impresses you or you just want to contact me, then fill out the info below:</p>
                        <form action="https://formspree.io/f/mpzgordk" method="post">
                            <label>
                                Your email:
                            <br />
                                <input type="email" name="email" size="30" />
                            </label>
                            <br />
                            <label>
                                Your message:
                            <br />
                                <textarea name="message" rows="4" cols="50"></textarea>
                            </label>
                            <br />
                            <button type="submit">Submit</button>
                        </form>
 
                    </div>
                </div>
            </div>
        </div>

    );
};


export default Contact;