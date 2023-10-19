import React, { useState, useEffect } from 'react';

function Clock() {
    const storage = window.localStorage;
    const tempstorage = window.sessionStorage;

    const timetable = { "9:30": "10:00", "10:00": "10:30", "10:30": "11:00", "11:00": "11:30", "11:30": "12:00", "12:00": "12:30", "12:30": "13:00", "13:00": "13:30", "13:30": "14:00", "14:00": "14:30", "14:30": "15:00", "15:00": "15:30", "15:30": "16:00", "16:00": null };
    const conversion = { "9:30": "9:30AM", "10:00": "10:00AM", "10:30": "10:30AM", "11:00": "11:00AM", "11:30": "11:30AM", "12:00": "12:00PM", "12:30": "12:30PM", "13:00": "1:00PM", "13:30": "1:30PM", "14:00": "2:00PM", "14:30": "2:30PM", "15:00": "3:00PM", "15:30": "3:30PM", "16:00": "After Market" };

    const [time, setTime] = useState(storage.getItem("Time"));
    const [day, setDay] = useState(storage.getItem("Day"));

    useEffect(() => {
        //code for keeping clock and day updated
        const intervalId = setInterval(() => {
            if (timetable[storage.getItem("Time")] && tempstorage.getItem("start")) {
                incrementClock();
                setTime(storage.getItem("Time"));
            }
        }, 3000);

        const handleTime = (e) => {
            setTime(storage.getItem("Time"));
            setDay(storage.getItem("Day"));
        };
        window.addEventListener('setTime', handleTime);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('setTime', handleTime);
        };
    })





    function incrementClock() {

        let stocks = JSON.parse(storage.getItem("Today"));
        let tickerlist = Object.keys(stocks["Tickers"]);

        tickerlist.forEach(element => {
            //CODE FOR HOURLY MARKET MOVEMENT EXTREMELY IMPORTANT!!!!---------------------------------------------------------------------------------------------------------------------------------
            let change = (Math.random() * .06) - .03;
            let uppervariation = (Math.random() * .02) + change;
            let lowervariation = (Math.random() * -.02) + change;
            let info = stocks["Tickers"][element]["Prices"];
            let reference = parseFloat(info[storage.getItem("Time")]["Close"]);
            let close = (reference + (reference * change)).toFixed(3);
            let high = (reference + (reference * uppervariation)).toFixed(3);
            let low = (reference + (reference * lowervariation)).toFixed(3);

            //storing information useful for historic data !!!!INFO FOR VOLUME AND SHARES MISSING!!!!
            if (high > stocks["Tickers"][element]["High"]) {
                stocks["Tickers"][element]["High"] = parseFloat(high);
            }
            if (low < stocks["Tickers"][element]["Low"]) {
                stocks["Tickers"][element]["Low"] = parseFloat(low);
            }
            stocks["Tickers"][element]["Close"] = parseFloat(close);
            //formatting for data json
            let combined = { "Open": reference, "Close": parseFloat(close), "Volume": 1000, "Shares": 1000, "High": parseFloat(high), "Low": parseFloat(low) };
            stocks["Tickers"][element]["Prices"][timetable[storage.getItem("Time")]] = combined;
        });


        storage.setItem("Today", JSON.stringify(stocks));
        storage.setItem("Time", timetable[storage.getItem("Time")]);
    }


    const nextDay = () => {
        //formating and incrementation logic for day
        storage.setItem("Time", "9:30");
        setTime("9:30");

        let data = storage.getItem("Day").split("-");
        if (data[1] === "20") {
            if (data[0] === "4") {
                data[0] = "1";
                data[2] = String(parseInt(data[2]) + 1);
            }
            else {
                data[0] = String(parseInt(data[0]) + 1);
            }
            data[1] = "1"
        }
        else {
            data[1] = String(parseInt(data[1]) + 1);
        }

        let stocks = JSON.parse(storage.getItem("Today"));
        let tickerlist = Object.keys(stocks["Tickers"]);
        let historical = JSON.parse(storage.getItem("Historical"));

        tickerlist.forEach(element => {
            //Storing daily data into historical json format
            let ref = stocks["Tickers"][element];
            let combined = { "Open": parseFloat(ref["Open"]), "Volume": parseFloat(ref["Volume"]), "Shares": parseFloat(ref["Shares"]), "High": parseFloat(ref["High"]), "Low": parseFloat(ref["Low"]), "Close": parseFloat(ref["Close"]) };
            historical["Tickers"][element][storage.getItem("Day")] = combined;

            //CODE FOR OPENING MARKET HOURS EXTREMELY IMPORTANT!!!!---------------------------------------------------------------------------------------------------------------------------------
            let openingmovement = (Math.random() * .08) - .04;
            let uppervariation = (Math.random() * .02) + openingmovement;
            let lowervariation = (Math.random() * -.02) + openingmovement;
            let close = (parseFloat(ref["Close"]) + (parseFloat(ref["Close"]) * openingmovement)).toFixed(3);
            let high = (parseFloat(ref["Close"]) + (parseFloat(ref["Close"]) * uppervariation)).toFixed(3);
            let low = (parseFloat(ref["Close"]) + (parseFloat(ref["Close"]) * lowervariation)).toFixed(3);

            let newprices = {"9:30":{"Open": parseFloat(ref["Close"]),"Close": parseFloat(close),"Volume": 300,"Shares": 450000,"High": parseFloat(high),"Low": parseFloat(low)}}
            stocks["Tickers"][element]["Prices"] = newprices;
            stocks["Tickers"][element]["Open"] = parseFloat(ref["Close"]);
            stocks["Tickers"][element]["Close"] = parseFloat(close);
            stocks["Tickers"][element]["High"] = parseFloat(high);
            stocks["Tickers"][element]["Low"] =parseFloat(low);
            //stocks["Tickers"][element]["Volume"] =
            //stocks["Tickers"][element]["Shares"] =
        });
        storage.setItem("Historical", JSON.stringify(historical));
        storage.setItem("Today", JSON.stringify(stocks));
        let assembled = String(data[0] + "-" + data[1] + "-" + data[2]);
        storage.setItem("Day", assembled);
        setDay(assembled);
    };

    return (
        <div>
            <div>{day}</div>
            {conversion[time]}
            {time === "16:00" ? <button onClick={nextDay}> next day </button> : ''}
        </div>

    );
}

export default Clock;