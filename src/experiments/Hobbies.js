import React, { useEffect, useState, createElement, Component } from 'react';
import { useSpring, animated } from 'react-spring';
import ReactDOM from "react-dom";
import './Pages.css';
import GridLayout from "react-grid-layout";


import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

//import Cookies from 'js-cookie';

<<<<<<< HEAD
=======
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';

  
>>>>>>> af44f61599c69019207c12fec02077414455c576

const Hobbies = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [bounce, setDebounce] = useState(false);
    const [gridSize, setGridSize] = useState(1200);
    const [resizeBounce, setResizeBounce] = useState(true);
<<<<<<< HEAD
    const [jsonData, setJsonData] = useState(null);
    const [testData, setTestData] = useState(null);

   // var cookieValue = Cookies.get("value");
  



=======
	const [height, setHeight] = useState(800);
	
>>>>>>> af44f61599c69019207c12fec02077414455c576
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

           // if(!cookieValue){
          //      Cookies.set("value", data);
         //   }
          
          } catch (error) {
            console.error('Error fetching JSON:', error);
          }
        }
    
        fetchData();
      }, []);
    




    const handleClick = (event) => {
        if (!bounce) {

            setDebounce(true);
<<<<<<< HEAD
            if (event.target.id == "Hobbies") {
                setIsHidden(false);
                const timer = setTimeout(() => {
                    setIsVisible(true);
                    setGridSize(document.getElementById("container").offsetWidth - 100);
                }, 1000);
                window.addEventListener('resize', updateSize);
=======
            if (event.target.id == "Hobbies"  ) {

				
                setIsHidden(false);
                const timer = setTimeout(() => {
                    setIsVisible(true);
					if(document.getElementById("container").offsetWidth != 0){
						setGridSize(document.getElementById("container").offsetWidth *.9);
						setHeight(document.getElementById("container").offsetHeight * .6);
					}
                }, 1000);

>>>>>>> af44f61599c69019207c12fec02077414455c576
            }
            else if (event.target.id && event.target.tagName == "LI") {

                setIsVisible(false);
                const timer = setTimeout(() => {
                    setIsHidden(true);
                }, 500);
                window.removeEventListener('resize', updateSize);
            }
        }
    };
<<<<<<< HEAD

    const updateSize = (event) => {

        if (isVisible && resizeBounce) {
            setResizeBounce(false);
            setGridSize(document.getElementById("container").offsetWidth - 100);
        }
    }

=======
	
    const updateSize = (event) =>{
        
        if(isVisible && resizeBounce){
            //console.log(document.getElementById("image").offsetHeight *.6);
            setResizeBounce(false);
            setGridSize(document.getElementById("container").offsetWidth*.9);
			//setHeight(document.getElementById("image").offsetHeight * .6);
        }
    }
>>>>>>> af44f61599c69019207c12fec02077414455c576

    const fadeOutStyle = {
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-out'
    };



    document.addEventListener('click', handleClick);
<<<<<<< HEAD
    window.addEventListener('resize', updateSize);
    return (

        <div class={isHidden ? 'hidden' : ''}>
            <div style={fadeOutStyle}>

                <div id="container" class="container" >

                    <div style={{paddingLeft: '50px'}}>
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
                                {JSON.stringify(jsonData)}
                                {jsonData ? jsonData.Tickers.DC.Name : ''}
                                
=======
	window.addEventListener('resize', updateSize);
	
	
return (
    
    <div class={isHidden ? 'hidden' : ''}>
        <div style={fadeOutStyle}>

            <div class="container" style={{ width: "800" }}>
                <div id="container" class="textcontainer" >
                    <p>
                       Here's a pin board of projects and activities that I've done. Feel free to shuffle the photos around.
                    </p>
                        
                    <GridLayout
                    className="layout"
                    layout={layout}
                    cols={4}
                    rowHeight={height}
                    autoSize={true}
                    width={gridSize}
					isResizable={false}
                    >
                        <div  key="rockclimb"> 
                        <Polaroid  img1={rockclimb} img2={boulderingText}/>
>>>>>>> af44f61599c69019207c12fec02077414455c576
                        </div>
                            </div>
                            <div key="brakejob">
                                <div class="tickerBox">
                                {JSON.stringify(testData)}
                        </div>
                            </div>
                        </GridLayout>
<<<<<<< HEAD

                    </div>
=======
	
>>>>>>> af44f61599c69019207c12fec02077414455c576
                </div>
            </div>
        </div>

    );
};




export default Hobbies;