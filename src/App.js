import './App.css';
import React from "react"
import Main from "./main.js"
import ReactGA from "react-ga"

function initializeAnalytics(){
      ReactGA.initialize("G-QFGQZKTV2D")
      ReactGA.pageview("/MainPage")
}

class App extends React.Component{
      
      render(){
            initializeAnalytics();
            return(
                  <div className='bg-black'>
                        <div className=" hidden lg:block">
                              <Main />
                        </div>
                        <div className="mobile-screen lg:hidden flex h-screen bg-gray-900">
                              <span className='m-auto text-gray-300 font-bold text-3xl text-center '>Please use this website on your computer.</span>
                        </div>
                  </div>
                  
            )
      }
}





export default App;