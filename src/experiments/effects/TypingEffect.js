import React, { useState, useEffect } from 'react';

const TypingEffect = ({ text, speed }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayText(text.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => {
            clearInterval(interval);
        };
    }, [text, speed]);

    return (
        <div>{displayText}</div>
    );
};

export default TypingEffect;