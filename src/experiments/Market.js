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
import { func } from 'prop-types';

const Market = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [bounce, setDebounce] = useState(false);
    const [gridSize, setGridSize] = useState(1200);
    const [resizeBounce, setResizeBounce] = useState(true);

    const timetable = ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
    const [updated, setUpdated] = useState(false);

    const [chartWidth, setChartWidth] = useState(200);

    const [timer, setTimer] = useState(null);

    const [day, setDay] = useState("1-1-1990");
    const [time, setTime] = useState("9:30");




    const layout = [
        { i: "rockclimb", x: 0, y: 0, w: 1, h: 1 },
        { i: "brakejob", x: 1, y: 0, w: 1, h: 1 },
        { i: "carposter", x: 2, y: 0, w: 1, h: 1 }
    ];


    const [todayData, setTodayData] = useState(null);
    const [playerData, setPlayerData] = useState(null);
    const [historicalData, setHistoricalData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const today = await fetch('/Data/Today/Stocks.json');
                const portfolio = await fetch('/Data/Player/Portfolio.json');
                const historical = await fetch('/Data/Historical/Stocks.json');
                if (!today.ok || !portfolio.ok || !historical.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await today.json();
                setTodayData(data);
                const data1 = await portfolio.json();
                setPlayerData(data1);
                const data2 = await historical.json();
                setHistoricalData(data2);
                // if (!cookieValue) {
                Cookies.set("Today", JSON.stringify(data));
                Cookies.set("Portfolio", JSON.stringify(data1));
                Cookies.set("Historical", JSON.stringify(data2));
                //}

            } catch (error) {
                console.error('Error fetching JSON:', error);
            }
        }

        fetchData();
    }, []);






    const getHistorical = () => {

    }


    const handleClick = (event) => {
        if (!bounce) {
            setDebounce(true);
            if (event.target.id == "Market") {
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
            setChartWidth((document.getElementById("container").offsetWidth - 200) / 3);

        }
    }


    const fadeOutStyle = {
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-out'
    };




    function PurchaseForm(props) {
        const{ticker} = props
        const [order, setOrder] = useState(0);
        const [buy, setBuy] = useState(true);
        const stocks = Cookies.get("Today");
        const portfolio = Cookies.get("Portfolio");

        const size = Object.keys(JSON.parse(stocks)['Tickers'][ticker]['Prices']).length-1;
        const intervals = JSON.parse(stocks)['Tickers'][ticker]['Prices'];
        const psize = Object.keys(JSON.parse(portfolio)).length-1

        const handler = (event) => {
            event.preventDefault();
            const price = intervals[timetable[size]]['Close'] * order;
            console.log("purchase:" + price);
            var personal = JSON.parse(portfolio)[psize]['Cash']['Personal'];
            var loan = JSON.parse(portfolio)[psize]['Cash']['Loan'];
            console.log( personal+ loan);
            if(personal + loan >= price){
                personal -= price;
                if(personal < 0){
                    loan += personal
                }
            }
            else{
                setOrder((personal + loan)/intervals[timetable[size]]['Close']);
            }
            console.log("after purchase:" + personal + loan);
            var stockinfo = JSON.parse(portfolio)[psize]["Stocks"];
            if(JSON.parse(portfolio)[psize]["Stocks"][ticker] == null){
                stockinfo[ticker] = order;
            }
            else{
                stockinfo[ticker] = parseInt(stockinfo[ticker]) + parseInt(order);
            }
            console.log(stockinfo);
            var index = parseInt(psize+1);
            const jsondata = [JSON.parse(portfolio),{index:{"Day":day,"Time":time,"Cash":{"Personal":personal,"Loan":loan},"Stocks":{stockinfo},"Options":{}}}];
            console.log(jsondata);
        }
        return (
            <form onSubmit={handler} >
                <input type="number" value={order} onChange={(e) => setOrder(e.target.value)}/>
                <input type="submit" value="buy" onClick={(e) => setBuy(true)}/>
                <input type="submit" value="sell" onClick={(e) => setBuy(false)}/>
            </form>
        )
    }


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

                                    {todayData ? todayData.Tickers.DC.Name : ''}
                                    <div>

                                        {Cookies.get("Today") ? <Chart ticker={'DC'} width={chartWidth} height={200} timescale={"Today"} /> :  'Data error stocks'}
                                        {Cookies.get("Portfolio") ? <PurchaseForm ticker ='DC'/> : "data error forms"}
                                    </div>
                                </div>
                            </div>
                            <div key="brakejob">
                                <div class="tickerBox">
                                    {todayData ? todayData.Tickers.S.Name : ''}
                                    <div>

                                        {Cookies.get("Today") ?<Chart ticker={'B'} width={chartWidth} height={200} timescale={"Today"} /> : 'Data error stocks'}
                                    </div>
                                </div>
                            </div>
                        </GridLayout>

                    </div>
                </div>
            </div>
        </div>

    );
};






export default Market;