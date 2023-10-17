import React, {  useEffect,useState, Component } from 'react';
import ReactDOM from "react-dom";

import './App.css';
import './experiments/Pages.css';
import TypingEffect from './experiments/effects/TypingEffect';

import Sidebar from './experiments/Sidebar';
import Portfolio from './experiments/Portfolio';
import News from './experiments/News';
import Market from './experiments/Market';
import Contact from './experiments/Contact';


function App() {

    const [isHidden, setIsHidden] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [bounce, setDebounce] = useState(false);
    const [timer, setTimer] = useState(null);
    const storage = window.localStorage;
    const tempstorage = window.sessionStorage;
    const [today, setToday] = useState(null);
    const [portfolio, setPortfolio] = useState(null);
    const [historical, setHistorical] = useState(null);

    const timetable = {"9:30": "9:30AM","10:00": "10:00AM","10:30": "10:30AM","11:00": "11:00AM","11:30": "11:30AM","12:00": "12:00PM","12:30": "12:30PM","13:00": "1:00PM","13:30": "1:30PM","14:00": "2:00PM","14:30": "2:30PM","15:00": "3:00PM","15:30": "3:30PM","16:00": "4:00PM"};

    const handleClick = (event) => {

        if (!bounce) {
            setDebounce(true);
            if (event.target.id && event.target.tagName === "LI") {

                setIsVisible(false);
                setTimer(setTimeout(() => {
                    setIsHidden(true);
                }, 500))
                return () => clearTimeout(timer);
            }
        }
    };
    


    const fadeOutStyle = {
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-out',
    };


    document.addEventListener('click', handleClick);

    const load = () =>{
        tempstorage.setItem("start",true);
        if(storage.getItem("Today")){
        
        setIsVisible(false);
                setTimer(setTimeout(() => {
                    setIsHidden(true);
                }, 500))
        }
        else{
            newGame();
        }
    }

    const newGame = () =>{
        tempstorage.setItem("start",true);
        storage.setItem("Today", JSON.stringify(today));
        storage.setItem("Portfolio", JSON.stringify(portfolio));
        storage.setItem("Historical", JSON.stringify(historical));
        storage.setItem("Day", "1-1-1990");
        storage.setItem("Time","9:30");
        setIsVisible(false);
        setTimer(setTimeout(() => {
            setIsHidden(true);
        }, 500))
        
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetch('/Data/Today/Stocks.json');
                const data1 = await fetch('/Data/Player/Portfolio.json');
                const data2 = await fetch('/Data/Historical/Stocks.json');
                if (!data.ok || !data1.ok || !data2.ok) {
                    throw new Error('Network response was not ok');
                }
                setToday(await data.json());
 
                setPortfolio(await data1.json());
            
                setHistorical(await data2.json());

            } catch (error) {
               alert('Error fetching JSON:', error);
            }
        }

        fetchData();
    }, []);


    return (

        <div className="App">
            
            <div class={isHidden || tempstorage.getItem("start") ? "banner" :"bannerHome"}>
                <h1>Invest-Sim</h1>
                <div class={isHidden || tempstorage.getItem("start") ? 'hidden' : ''}>
                    <div style={fadeOutStyle}>
                            <div class="textcontainer" style={{textAlign: 'center'}}>
                                <TypingEffect text="game" speed={5} />
                                <button onClick={load}> Load</button>
                                <button onClick={newGame}> New Game</button>
                            </div>
                    </div>
                </div>
                <div class={tempstorage.getItem("start") ? '' : 'hidden'}>
                <p>{storage.getItem("Day")} </p>
                <p>{timetable[storage.getItem("Time")]}</p>
            </div>
            </div>

            {tempstorage.getItem("start") ? <Portfolio /> : ''}
            {tempstorage.getItem("start") ? <News /> : ''}
            {tempstorage.getItem("start") ? <Market /> : ''}
            {tempstorage.getItem("start") ? <Contact /> : ''}
            {tempstorage.getItem("start") ? <Sidebar /> : ''}


        </div>
    );

    
}



export default App;
