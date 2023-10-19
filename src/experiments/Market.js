import React, {  useState } from 'react';

import './Pages.css';
import GridLayout from "react-grid-layout";

import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';


import Chart from "./effects/Chart";

const Market = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [bounce, setDebounce] = useState(false);
    const [gridSize, setGridSize] = useState(1200);
    const [resizeBounce, setResizeBounce] = useState(true);

    const timetable = ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];

    const [chartWidth, setChartWidth] = useState(200);

    const [timer, setTimer] = useState(null);

    const storage = window.localStorage;

    //change this shitty system
    const layout = [
        { i: "rockclimb", x: 0, y: 0, w: 1, h: 1 },
        { i: "brakejob", x: 1, y: 0, w: 1, h: 1 },
        { i: "carposter", x: 2, y: 0, w: 1, h: 1 }
    ];





    const handleClick = (event) => {
        //currently handles the container sizes for the market and making things become visibile on button click
        if (!bounce) {
            setDebounce(true);
            if (event.target.id === "Market") {
                setIsHidden(false);
                setTimer(setTimeout(() => {
                    setIsVisible(true);
                    setGridSize(document.getElementById("container").offsetWidth - 100);
                }, 1000));     
                window.addEventListener('resize', updateSize);
                return () => clearTimeout(timer);
            }
            else if (event.target.id && event.target.tagName === "LI") {

                setIsVisible(false);
                setTimer(setTimeout(() => {
                    setIsHidden(true);
                }, 500));
                window.removeEventListener('resize', updateSize);
                return () => clearTimeout(timer);
            }
        }
    };

    const updateSize = (event) => {
        //stupid attempt for having a constantly resizing box, change this so the number of columns changes instead
        if (isVisible && resizeBounce) {
            setResizeBounce(false);
            setGridSize(document.getElementById("container").offsetWidth - 100);
            setChartWidth((document.getElementById("container").offsetWidth - 200) / 3);

        }
    }

    //trash code i stole from chatgpt for the fade, i should clean this up
    const fadeOutStyle = {
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-out'
    };




    function PurchaseForm(props) {
        const { ticker } = props
        const [order, setOrder] = useState(0);
        const [buy, setBuy] = useState(true);

        const handler = (event) => {
            //stops the page refresh and makes sure orders are only done during market hours.
            event.preventDefault();
            if (storage.getItem("Time") !== "16:00") {
         
                //a trillion different variables to help make this more "organized." good luck fixing this idiot
                let day = storage.getItem("Day");
                let time = storage.getItem("Time");
                
                let stocks = storage.getItem("Today");
                let portfolio = storage.getItem("Portfolio");
                let portfolioString = JSON.stringify(JSON.parse(portfolio));
                let size = Object.keys(JSON.parse(stocks)['Tickers'][ticker]['Prices']).length - 1;
                let intervals = JSON.parse(stocks)['Tickers'][ticker]['Prices'];
                let psize = Object.keys(JSON.parse(portfolio)).length
                let price = intervals[timetable[size]]['Close'] * order;
                let personal = JSON.parse(portfolio)[psize]['Cash']['Personal'];
                let loan = JSON.parse(portfolio)[psize]['Cash']['Loan'];
                let stockinfo = JSON.parse(portfolio)[psize]["Stocks"];

                //logic for when the purchase/sale is made.
                if (buy) {
                    if (personal + loan >= price) {
                        personal -= price;
                        if (personal < 0) {
                            loan += personal;
                            personal = 0;
                        }

                        if (JSON.parse(portfolio)[psize]["Stocks"][ticker] == null) {
                            stockinfo[ticker] = order;
                        }
                        else {
                            stockinfo[ticker] = parseFloat(stockinfo[ticker]) + parseFloat(order);
                        }
                        const index = (psize + 1).toString();

                        const jsondata = JSON.parse("{" + portfolioString.substring(1, portfolioString.length - 1) + ",\"" + index + "\":" + JSON.stringify({ "Day": day, "Time": time, "Cash": { "Personal": personal, "Loan": loan }, "Stocks": stockinfo, "Options": {} }) + "}");
                        storage.setItem("Portfolio", JSON.stringify(jsondata));
                    }
                    else {
                        setOrder((personal + loan) / intervals[timetable[size]]['Close']);

                    }
                }
                else {
                    if (stockinfo[ticker] >= order) {
                        personal += price;

                        stockinfo[ticker] = parseFloat(stockinfo[ticker]) - parseFloat(order);

                        const index = (psize + 1).toString();

                        const jsondata = JSON.parse("{" + portfolioString.substring(1, portfolioString.length - 1) + ",\"" + index + "\":" + JSON.stringify({ "Day": day, "Time": time, "Cash": { "Personal": personal, "Loan": loan }, "Stocks": stockinfo, "Options": {} }) + "}");
                        storage.setItem("Portfolio", JSON.stringify(jsondata));
                    }
                    else {
                        setOrder(stockinfo[ticker]);

                    }
                }
            }
            else{
                console.log("after market hours retard 🤦‍♂️");
            }
        }
        return (
            <form onSubmit={handler} >
                <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} />
                <input type="submit" value="buy" onClick={(e) => setBuy(true)} />
                <input type="submit" value="sell" onClick={(e) => setBuy(false)} />
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

                                    {JSON.stringify(JSON.parse(storage.getItem("Historical"))['Tickers']['DC']['Name'])}
                                    <div>

                                        <Chart ticker={'DC'} width={chartWidth} height={200} timescale={"Today"} />
                                        <PurchaseForm ticker='DC' />
                                    </div>
                                </div>
                            </div>
                            <div key="brakejob">
                                <div class="tickerBox">
                                    {JSON.stringify(JSON.parse(storage.getItem("Historical"))['Tickers']['B']['Name'])}
                                    <div>

                                        <Chart ticker={'B'} width={chartWidth} height={200} timescale={"Today"} />
                                        <PurchaseForm ticker='B' />
                                    </div>
                                </div>
                            </div>
                            <div key="carposter">
                                <div class="tickerBox">
                                    {JSON.stringify(JSON.parse(storage.getItem("Historical"))['Tickers']['SM']['Name'])}
                                    <div>

                                        <Chart ticker={'SM'} width={chartWidth} height={200} timescale={"Today"} />
                                        <PurchaseForm ticker='SM' />
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