import React, { useState, createElement } from 'react';
import ReactCardFlip from 'react-card-flip';
import '../Pages.css';

function FlipCard(props) {
  const { front, back, frontCSS, backCSS, click, clickHandler} = props;




  return (
    <div style={{ paddingRight: '20px', paddingBottom: '20px', position: 'relative', float: 'left' }}>
      <ReactCardFlip isFlipped={click} flipDirection="vertical" >
        <div className="flip-card" key="front" style={frontCSS} onClick={clickHandler}>
          <div className="flip-card-inner">
            <div id={front} className="flip-card-front">
              <p id={front} style={{padding:'10px'}}>{front}</p>
            </div>
          </div>
        </div>

        <div className="flip-card" style={backCSS} key="back" onClick={clickHandler}>
          <div className="flip-card-inner">
            <div id={front} className="flip-card-back" >
              <p id={front}style={{padding:'12px'}}>{back}</p>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default FlipCard;