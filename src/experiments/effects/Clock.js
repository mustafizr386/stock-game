import React, { useState, useEffect } from 'react';

function Clock() {
    const storage = window.localStorage;
    const tempstorage = window.sessionStorage;

    const timetable = { "9:30": "10:00", "10:00": "10:30", "10:30": "11:00", "11:00": "11:30", "11:30": "12:00", "12:00": "12:30", "12:30": "13:00", "13:00": "13:30", "13:30": "14:00", "14:00": "14:30", "14:30": "15:00", "15:00": "15:30", "15:30": "16:00", "16:00": null };
    const conversion = { "9:30": "9:30AM", "10:00": "10:00AM", "10:30": "10:30AM", "11:00": "11:00AM", "11:30": "11:30AM", "12:00": "12:00PM", "12:30": "12:30PM", "13:00": "1:00PM", "13:30": "1:30PM", "14:00": "2:00PM", "14:30": "2:30PM", "15:00": "3:00PM", "15:30": "3:30PM", "16:00": "After Market" };

    const [time, setTime] = useState(storage.getItem("Time"));
    const [day, setDay] = useState(storage.getItem("Day"));

    useEffect(() => {

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
            let change = (Math.random()*.06)-.03;
            let uppervariation = (Math.random()*.02) + .03 + change;
            let lowervariation = (Math.random()*-.02) - .03 + change;
            let info = stocks["Tickers"][element]["Prices"];
            let reference = parseFloat(info[storage.getItem("Time")]["Close"]);
            let close = (reference +(reference * change)).toFixed(3);
            let high = (reference +(reference * uppervariation)).toFixed(3);
            let low = (reference +(reference * lowervariation)).toFixed(3);
            let combined = {"Open": reference, "Close" : parseFloat(close), "Volume" : 1000, "Shares" : 1000, "High" : parseFloat(high), "Low" : parseFloat(low)};
            stocks["Tickers"][element]["Prices"][timetable[storage.getItem("Time")]] = combined;
        });
    

        storage.setItem("Today", JSON.stringify(stocks));
        storage.setItem("Time", timetable[storage.getItem("Time")]);
    }


    const nextDay = () => {
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