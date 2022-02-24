import React from "react"
import translate from "./translate";
import "./App.css"
import AccountDropdown from "./dropdown.jsx";

class Main extends React.Component{
    constructor() {
        super();
        this.state = {
            textAreaValue: "",
            run: false,
            output: null,
            error:null,
            isOpen: false,
			parentClass: props.parentClass
        };
        this.handleChange = this.handleChange.bind(this);
        this.run = this.run.bind(this)
    }

    handleChange(event) {
        this.setState({ textAreaValue: event.target.value });
    }

    run() {
        let code = this.state.textAreaValue
        console.log(code)

        // Turning this into a function
        code = "function jsfjdnfs() {\n let jsdfksdj=[]\n"+code+"\n return jsdfksdj\n} \njsfjdnfs()"

        let js = translate(code)
        console.log(js)

        // Running string
        try {
            let out = eval(js)
            
            let outp = ""
            for (let q=0; q<out.length;q++) {
                outp = outp+out[q].toString()+"\n"
            }
            this.setState({ error: null })
            this.setState({ output: outp })
        } catch (error) {
            console.log(error)
            let err = error.name
            console.log(err)
            this.setState({ output:null })
            if (err=="ReferenceError") {
                this.setState({ error: "Error: "+(error.message).toString()+". \nHint: you may have to write 'let' the first time that you define a variable. eg. 'let x = 3'"});
                //Error: varmake sure to write 'let' the first time that you define a variable. \neg. 'let x = 3'
            } else if (err=="SyntaxError") {
                let m=error.message
                if (m.indexOf("end of input") != -1) {
                    this.setState({ error:"Error: remember to end if statements, loops and functions with 'end'."})
                } 
                
            } else {
                this.setState({ error:"Error: "+(error.message).toString()})
            }
        }
        

    }

    toggleDropdown() {
		this.setState({ isOpen: !this.state.isOpen });
	}

	closeDropdown() {
		this.setState({ isOpen: false });
	}


    render(){
        return(
            <div className="h-screen bg-black bg-opacity-85"> 
                <div className="navigation flex p-5 bg-gray-900 bg-opacity-50">
                    <img src="https://via.placeholder.com/150x60.png" alt="" className="logo" />
                    <div className="w-96 flex-1"></div>
                    <AccountDropdown className="m-10" />
                    <button className="border-green-500 border-2 hover:bg-transparent bg-green-500 py-3 px-8 rounded-full font-bold text-white hover:text-green-500 outline-none" onClick={this.run}>Run</button>
                </div>
                <form className="body-div flex body-class bg-gray-900 bg-opacity-50">    
                    <textarea value={this.state.textAreaValue} onChange={this.handleChange} placeholder="// Enter your code here:" className="mx-10 my-16 flex-1 bg-gray-900 p-5 text-white outline-none leading-relaxed"/>

                    <div className="flex-1 mx-10 my-16 bg-gray-900 p-5 text-white">
                        {
                            (this.state.output != null) ? <pre>{this.state.output}</pre> : null
                        }
                        {
                            (this.state.error != null) ? <div className="text-red-500 break-words">{this.state.error}</div> : null
                        }
                        
                    </div>
                </form>
            </div>
        )
    }
}

export default Main


// Still to do:
// Logo
// Implementation of function
// Error checking
// Sample list