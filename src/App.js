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
                  <div>
                        <div className=" hidden lg:block">
                              <Main />
                        </div>
                        <div className="mobile-screen lg:hidden flex h-screen">
                              <span className='m-auto'>Please use this website on your computer.</span>
                        </div>
                  </div>
                  
            )
      }
}





export default App;