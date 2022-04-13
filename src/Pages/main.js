import React from "react"
import Airtable from "airtable";
import OptionPiece from "../components/option";

class Authenticate extends React.Component{
    constructor() {
        super();
        this.state = {
            name:"",
            temp_name:"",
            temp_choice:"",
            error:"",
            new: false,
            options:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.create = this.create.bind(this)
        this.chooseName = this.chooseName.bind(this)
        this.name_select = this.name_select.bind(this)
        this.new_name_select = this.new_name_select.bind(this)
        this.authenticate = this.authenticate.bind(this)
    }
    
    create(){
        console.log(this.state.name)

    }

    handleChange(event) {
        this.setState({ temp_name: event.target.value });
    }

    chooseName(){
        let temp = this.state.temp_choice
        this.setState({ name: temp })
    }

    name_select(event){
        this.setState({ temp_choice: event.target.value });
        this.setState({ new:false })
    }

    new_name_select() {
        let temp = this.state.temp_name
        this.setState({ name: temp })
        this.setState({ new:true })
    
    }

    authenticate() {
        var base = new Airtable({apiKey: 'keyZBa6Zue26Qd9BX'}).base('appwhIolXtHdjTzlL');

        let name = this.state.name

        if (this.state.name != "" && this.state.name != "--Select--         "){
            if (this.state.new) {
                console.log("Its a new one")
        
                base('Main').create([
                    {
                      "fields": {
                        "NameID": name,
                      }
                    },])
            } 

            let space = this.state.name
            this.props.handler(space)
        } else {
            this.setState({ error: "Please choose a profile. " })
        }
    }

    componentDidMount() {
        var Airtable = require('airtable');
        var base = new Airtable({apiKey: 'keyZBa6Zue26Qd9BX'}).base('appwhIolXtHdjTzlL');
        let options = this.state.options

        base('Main').select({
            view: "Grid view"
        }).eachPage((records, fetchNextPage) => {
            // This function (`page`) will get called for each page of records.

            records.forEach((record) => {
                options.push(record.get('NameID'))
                
            });

            this.setState({ options:options })

            fetchNextPage();

        }, function done(err) {
            if (err) { console.error(err); return; }
        });
    }


    render(){
        return(
            <div className="w-screen flex h-screen">
                <div className="m-auto w-1/2 h-3/5">
                    <p className="mx-5 text-lg font-bold text-blue-500">User: <span className="text-gray-700  font-normal">{this.state.name=="" ? "not chosen" : this.state.name}</span></p>
                    <div className=" border-2 p-10 m-5 w-full">
                        <p className="m-auto font-bold">Creating a new profile:</p>
                        <hr className="border-t-1 w-full mt-2 mb-4"></hr>
                        <div className="m-auto">
                            <input type="text" placeholder="Enter your name here." onChange={this.handleChange} className="mr-3 outline-none"/>
                            <button onClick={this.new_name_select} className="text-blue-500 font-bold hover:text-blue-400">Add</button>
                        </div>
                    </div>
                    <div className=" border-2 p-10 m-5 w-full">
                        <p className="m-auto font-bold">Or choose a previously created one:</p>
                        <hr className="border-t-1 w-full mt-2 mb-4"></hr>
                        <div className="m-auto">
                            <select name="" id="" onChange={this.name_select} className="mr-3 outline-white" placeholder="Select a name">
                                {
                                    this.state.options.map(x => <OptionPiece name={x}/> )
                                }
                            </select>

                            <button onClick={this.chooseName} className="text-blue-500 font-bold hover:text-blue-400">Select</button>
                        </div>
                    </div>
                    <div>
                        <button onClick={this.authenticate} className="py-3 border-2 border-blue-500 rounded-lg mx-5 inline-block w-full bg-blue-500 text-white font-bold hover:bg-blue-400 hover:border-blue-400" type="button" >GO!</button>
                        <p className="text-red-500 m-5">{this.state.error}</p>
                    </div>
                    
                </div>
                
            </div>
        )
    }
}

export default Authenticate
