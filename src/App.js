import './App.css';
import React from "react"
import Authenticate from "./Pages/main.js"
import TypePage from './Pages/typing';
import Landing from './Pages/landing';

class App extends React.Component{
      constructor(props) {
            super(props)

            this.state = {
                  ready: false,
                  loggedIn : false,
                  profile: "",
            }

            this.authHandler = this.authHandler.bind(this)
            this.backHandler = this.backHandler.bind(this)
            this.readyHandler = this.readyHandler.bind(this)
      }

      authHandler(name) {
            this.setState({ loggedIn: true })
            this.setState({ profile:name })
      }

      backHandler() {
            this.setState({ loggedIn: false })
            this.setState({ profile:"" })
      }

      readyHandler() {
            this.setState({ ready: true })
      }
      
      render(){
            if (this.state.loggedIn) {
                  return(
                        <TypePage profile={this.state.profile} handler={this.backHandler}/>
                  )
                  
            } else if (this.state.ready) {
                  return(
                        <Authenticate handler={this.authHandler}/>
                  )
                  
            } else {
                  return(
                        <Landing handler={this.readyHandler}/>
                  )
            }
            
      }
}





export default App;