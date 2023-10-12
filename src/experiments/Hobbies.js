import React, { useEffect, useState, createElement, Component } from 'react';
import { useSpring, animated } from 'react-spring';
import ReactDOM from "react-dom";
import './Pages.css';
import GridLayout from "react-grid-layout";
import * as d3 from "d3";

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

import Cookies from 'js-cookie';
import Chart from "./effects/Chart";

const Hobbies = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [bounce, setDebounce] = useState(false);
    const [gridSize, setGridSize] = useState(1200);
    const [resizeBounce, setResizeBounce] = useState(true);
    const [jsonData, setJsonData] = useState(null);
    const [testData, setTestData] = useState(null);

    const [updated, setUpdated] = useState(false);
    var cookieValue = Cookies.get("Today");

    const [chartWidth, setChartWidth] = useState(200);

    const [timer, setTimer] = useState(null);

    const layout = [
        { i: "rockclimb", x: 0, y: 0, w: 1, h: 1 },
        { i: "brakejob", x: 1, y: 0, w: 1, h: 1 },
        { i: "carposter", x: 2, y: 0, w: 1, h: 1 }
    ];



    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/Data/Today/Stocks.json');
                const response2 = await fetch('/test.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setJsonData(data);
                const data2 = await response2.json();
                setTestData(data2);
               // if (!cookieValue) {
                    Cookies.set("Today", JSON.stringify(data));
                //}

            } catch (error) {
                console.error('Error fetching JSON:', error);
            }
        }

        fetchData();
    }, []);


    const getToday = () => {

        if (Cookies.get("Today") && !updated) {
            const timetable = ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
            const size = Object.keys(JSON.parse(Cookies.get("Today"))['Tickers']['DC']['Prices']).length;
            const intervals = JSON.parse(Cookies.get("Today"))['Tickers']['DC']['Prices'];
            let lastclose = null;

            setUpdated(true);
            return d3.range(15).map((item, i) => {

                if (i < size) {

                    const open = parseFloat(intervals[timetable[i]]['Open']);
                    const close = parseFloat(intervals[timetable[i]]['Close']);
                    const high = parseFloat(intervals[timetable[i]]['High']);
                    const low = parseFloat(intervals[timetable[i]]['Low']);
                    const volume = parseFloat(intervals[timetable[i]]['BuyVolume']);
                    lastclose = parseFloat(intervals[timetable[i]]['Close']);
                    console.log("open " + open + "close " + close + "high " + high + "low" + low + "volume" + volume)
                    return {
                        time: i,
                        open,
                        high,
                        low,
                        close,
                        volume
                    };
                }
                else {
                    const open = lastclose;
                    const close = lastclose;
                    const high = lastclose;
                    const low = lastclose;
                    const volume = 0;
                    return {
                        time: i,
                        open,
                        high,
                        low,
                        close,
                        volume
                    };
                }
            });
        }
    };

    const getHistorical = () => {

    }


    const handleClick = (event) => {
        if (!bounce) {

            setDebounce(true);
            if (event.target.id == "Hobbies") {
                setIsHidden(false);
                setTimer(setTimeout(() => {
                    setIsVisible(true);
                    setGridSize(document.getElementById("container").offsetWidth - 100);
                }, 1000));
                return () => clearTimeout(timer);
                window.addEventListener('resize', updateSize);
            }
            else if (event.target.id && event.target.tagName == "LI") {

                setIsVisible(false);
                setTimer(setTimeout(() => {
                    setIsHidden(true);
                }, 500));
                return () => clearTimeout(timer);
                window.removeEventListener('resize', updateSize);
            }
        }
    };

    const updateSize = (event) => {

        if (isVisible && resizeBounce) {
            setResizeBounce(false);
            setGridSize(document.getElementById("container").offsetWidth - 100);
            setChartWidth((document.getElementById("container").offsetWidth - 200)/3);
            console.log(document.getElementById("container").offsetWidth - 100)
        }
    }


    const fadeOutStyle = {
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-out'
    };

    const [today, setToday] = useState(getToday());

    document.addEventListener('click', handleClick);
    window.addEventListener('resize', updateSize);
    return (

        <div class={isHidden ? 'hidden' : ''}>
            <div style={fadeOutStyle}>

                <div id="container" class="container" >
                    <div style={{ paddingLeft: '50px' }}>
                        <GridLayout
                            className="layout"
                            layout={layout}
                            cols={3}
                            rowHeight={200}
                            autoSize={true}
                            width={gridSize}
                            isResizable={true}
                        >

                            <div key="rockclimb">
                                <div class="tickerBox">
                                    
                                    {jsonData ? jsonData.Tickers.DC.Name : ''}
                                    <div>
                                    <Chart data={today} width={chartWidth} height={200} />
                                    </div>
                                </div>
                            </div>
                            <div key="brakejob">
                                <div class="tickerBox">
                                    {JSON.stringify(testData)}
                                </div>
                            </div>
                        </GridLayout>

                    </div>
                </div>
            </div>
        </div>

    );
};




export default Hobbies;