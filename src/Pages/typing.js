import React from "react"
import Airtable from "airtable";
import update from "../components/update";

class TypePage extends React.Component{
    // Initialise state
    constructor() {
        super();
        this.state = {
            indexDown:0,
            indexUp:0,
            text:"we're already cyborgs. your phone and your computer are extensions of you, but the interface is through finger movements or speech, which are very slow.",
            keystroke: Array(304).fill(0), 
            timings:[0],
            profile: "",
            value:"",
            numberDone:0,
            id: "",
            finished: false
        };

        this.keyDown = this.keyDown.bind(this)
        this.keyUp = this.keyUp.bind(this)
        this.done = this.done.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.restart = this.restart.bind(this)
        this.testTable = this.testTable.bind(this)
        this.idManager = this.idManager.bind(this)
        this.countManager = this.countManager.bind(this)
    }

    restart() {
        this.setState({ timings: [0] })
        this.setState({ keystroke: Array(304).fill(0) })
        this.setState({ value:"" })
        this.setState({ indexUp:0 })
        this.setState({ indexDown:0 })
    }

    // Functions
    done(keystroke){
        let timings = this.state.timings
        let numDone = this.state.numberDone

        for (let i=1; i<keystroke.length;i++) {
            let time = keystroke[i]-keystroke[i-1]
            timings.push(time)
        }

        console.log(timings)
        this.setState({ numberDone: numDone+1 })
        this.restart()

        
        var base = new Airtable({apiKey: 'keyZBa6Zue26Qd9BX'}).base('appwhIolXtHdjTzlL');
        let id = this.state.id

        console.log(update(this.state.profile, numDone+1, timings.toString(), id))
        
        base('Main').update([
            update(this.state.profile, numDone+1, timings.toString(), id),
          ], function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
              console.log(record.getId());
            });
          });

          if (numDone+1 >= 20) {
            this.setState({ finished: true })
        }
        

        // Check whether the maximum number of entries is done
        // reset timings and keystroke
    }

    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    keyDown(event){

        let text = this.state.text
        let indexDown = this.state.indexDown
        let keystroke = this.state.keystroke


        let typed = String.fromCharCode(event.keyCode)

        if (typed == "\b") {
            event.preventDefault()
        } else {
            keystroke[2*indexDown] = Date.now()

            this.setState({ indexDown:indexDown+1 })
            this.setState({ keystroke: keystroke })
        }

    }

    keyUp(event){
        let text = this.state.text
        let indexUp = this.state.indexUp
        let keystroke = this.state.keystroke

        let typed = String.fromCharCode(event.keyCode)

        if (typed == "\b") {
            event.preventDefault()
        } else {
            keystroke[2*indexUp+1] = Date.now()

            this.setState({ indexUp:indexUp+1 })
            this.setState({ keystroke: keystroke })
        }

        if (indexUp > ((keystroke.length -4)/2)) {
            console.log("Done typing")
            this.done(keystroke)
        }

    }

    componentDidMount() {
        let profile = this.props.profile
        this.setState({ profile: profile })

        this.testTable()

    }

    testTable() {
        var Airtable = require('airtable');
        var base = new Airtable({apiKey: 'keyZBa6Zue26Qd9BX'}).base('appwhIolXtHdjTzlL');

        base('Main').select({
            view: "Grid view"
        }).eachPage((records, fetchNextPage) => {
            // This function (`page`) will get called for each page of records.

            records.forEach((record) => {

                if (record.get('NameID') == this.state.profile) {
                    this.idManager(record.id)
                    let left = true
                    let counter = 1

                    while (left) {
                        let col = "k"+counter.toString()
                        if (record.get(col) != undefined) {
                            counter += 1
                        } else {
                            left = false
                        }
                    }

                    this.countManager(counter-1)
                }
                
            });

            fetchNextPage();

        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }
    
    idManager(value) {
        this.setState({ id: value })
        console.log("id is now", value)
    }

    countManager(value) {
        this.setState({ numberDone: value })
        console.log("number done is now", value)

        if (value >= 20) {
            this.setState({ finished: true })
        }
    }

    // UI
    render(){
        if (this.state.finished == false) {
            return(
                <div className="w-screen flex h-screen">
                    <div className="m-auto w-1/2 h-3/5">
                        <div className="flex my-3">
                            <button className="text-gray-500 hover:text-gray-400 font-normal hover:underline" onClick={this.props.handler}>← Return</button>
                            <div className="w-96 flex-1"></div>
                            <button className="text-blue-500 font-bold hover:text-blue-400" onClick={this.restart}>Restart?</button>
                        </div>
                        <hr className="border-t-1 w-full mt-2 mb-8"></hr>
                        <p className="font-bold text-lg ">Please type out the following extract:</p>
                        
                        <div className="px-5  text-gray-500 border-l-2 py-3 my-5 border-blue-500">
                            <p>{this.state.text}</p>
                            <p className="text-sm  mt-3 text-gray-400">- Elon Musk</p>
                        </div>
                        <p className="text-gray-500 text-xs my-2">Don't worry about making mistakes. Just keep typing normally! Feel free to reset if you need to.</p>
                        
                        <input type="text" name="" id="" placeholder="Start typing..." onChange={this.handleChange} onKeyDown={this.keyDown} onKeyUp={this.keyUp} className="border-2 w-full p-3 outline-none whitespace-normal" value={this.state.value}/>
                        <p className="text-gray-500 text-xs my-2">Done {this.state.numberDone}/20</p>
                        
                    </div>
                    
                </div>
            )
        } else {
            return(
                <div className="w-screen flex h-screen bg-confetti bg-cover">
                    <div className="m-auto w-1/2 h-3/5 p-5 border-2 bg-white">
                        <div className="h-1/5">
                            <p className="text-2xl font-bold text-blue-500">You're done! </p>
                            <hr className="border-t-1 w-full mt-2 mb-8"></hr>
                            <p>Thank you so much for taking the time to help out. You've submitted 20/20 keystroke samples, so you're finished.</p>
                        </div>
                        
                        <div className="flex h-4/5">
                            <div className="m-auto">
                                <p className="text-9xl text-center"> 👍 </p>
                                <p className=" text-center text-sm text-gray-500 m-5">You're the MVP!</p>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
            )
        }
        
    }
}

export default TypePage


// Still to do:
// Choose a good length of text to be typed
