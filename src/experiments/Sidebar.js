// Sidebar.js

import React, { useState, createElement } from 'react';
import { useSpring, animated } from 'react-spring';
import './Sidebar.css';




const Sidebar = () => {
  const [displayText, setDisplayText] = useState('+');
  const [collapsed, setCollapsed] = useState(true);


  const sidebarProps = useSpring({
    transform: collapsed ? 'translateX(-200px)' : 'translateX(0px)',
  });




  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const collapse = () => {
    setDisplayText('+');
    setCollapsed(true);
  };
  const open = () => {
    setDisplayText('-');
    setCollapsed(false);
  };

  return (

    <animated.div className="sidebar" style={sidebarProps} onMouseEnter={open} onMouseLeave={collapse} >
      <div className="toggle-button" >
        <div className="menu">Menu</div>
        <div className="plus">{displayText}</div>
      </div>
      <ul>
        <li id="Home">Home</li>
        <li id="About Me">About Me</li>
        <li id="Skills">Skills</li>
        <li id="Hobbies">Hobbies</li>
        <li id="Contact">Contact</li>
      </ul>
    </animated.div>
  );
};

export default Sidebar;
