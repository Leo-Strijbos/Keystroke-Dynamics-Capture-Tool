import React from "react"
import Authenticate from "./main"

class Landing extends React.Component{
    constructor() {
        super();
        this.start = this.start.bind(this)
    }

    start() {
        this.props.handler()
    }

    render(){
        return(
            <div className="w-screen flex h-screen">
                <div className="m-auto w-1/2 h-3/5">
                    <p className="text-3xl font-bold text-blue-500">Keystroke Dynamics Extended Essay</p>
                    <hr className="border-t-1 w-full mt-4 mb-6"></hr>
                    <p>Welcome to my extended essay! Thanks for clicking on the link. You will be asked to type a sentence 20 times (doesn't all have to happen in one sitting), and then your keystroke data will be used in my extended essay. </p>
                    <p className="font-bold text-blue-500 mt-4 mb-2">What does this mean?</p>
                    <p>The only thing that is being collected is the time between clicks on your keyboard, so don't worry about privacy. The data will be used in various experiments, in order to try and distinguish one person's keystroke data from another's. The ultimate goal is to determine whether this is a viable approach to detect and prevent account sharing on sites like Netflix. </p>
                    <button className="py-3 border-2 border-blue-500 rounded-lg inline-block w-full bg-blue-500 text-white font-bold hover:bg-blue-400 hover:border-blue-400 mb-4 mt-8" onClick={this.start}>Get started</button>
                    <div className="flex">
                        <div className="flex-1 w-96"></div>
                        <p className="text-gray-500 text-xs italic">© Leo Strijbos</p>
                    </div>
                </div>
                
            </div>
        )
        
    }
}

export default Landing