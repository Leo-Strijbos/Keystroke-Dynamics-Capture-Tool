import React from "react"
import translate from "./files/translate";
import "./App.css"
import Red3 from "./img/red3.png"

class Main extends React.Component{
    constructor() {
        super();
        this.state = {
            textAreaValue: "",
            run: false,
            output: null,
            error:null,
            isOpen: false,


        };
        this.handleChange = this.handleChange.bind(this);
        this.run = this.run.bind(this)
        this.toggleDropdown = this.toggleDropdown.bind(this);
		this.closeDropdown = this.closeDropdown.bind(this);
    }

    handleChange(event) {
        this.setState({ textAreaValue: event.target.value });
    }

    run() {
        let code = this.state.textAreaValue

        let js = translate(code)

        // Turning this into a function
        js = "function jsfjdnfs() {\n let jsdfksdj=[]\n"+js+"\n return jsdfksdj\n} \njsfjdnfs()"

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
            let err = error.name
            this.setState({ output:null })
            if (err=="ReferenceError") {
                this.setState({ error: "Error: "+(error.message).toString()+". \nHint: you may have to write 'let' the first time that you define a variable. eg. 'let x = 3'"+". \nAlso, make sure to take a look at the guides if you need help!"});
                //Error: varmake sure to write 'let' the first time that you define a variable. \neg. 'let x = 3'
            } else if (err=="SyntaxError") {
                let m=error.message
                if (m.indexOf("end of input") != -1) {
                    this.setState({ error:"Error: remember to end if statements, loops and functions with 'end'."+". \nMake sure to take a look at the guides if you need help!"})
                } else {
                    this.setState({ error:"Error: "+(error.message).toString()+". \nMake sure to take a look at the guides if you need help!"})
                }
                
            } else {
                this.setState({ error:"Error: "+(error.message).toString()+". \nMake sure to take a look at the guides if you need help!"})
            }
        }
        

    }

    toggleDropdown() {
		this.setState({ isOpen: !this.state.isOpen });
	}

	closeDropdown() {
		this.setState({ isOpen: false });
	}

    guide(code) {
        this.setState({ textAreaValue:code})
    }


    render(){
        return(
            <div className="h-screen bg-black bg-opacity-85"> 
                <div className="navigation flex p-5 bg-gray-900 bg-opacity-50">
                    <img src={Red3} alt="" className="logo" className="h-16 ml-5 pt-4"/>
                    <div className="w-96 flex-1"></div>
                    <div class={this.state.parentClass}>
                        <div class="relative">
                            <button
                                onClick={this.toggleDropdown}
                                class="relative z-10 block border-2 bg-gray-500 rounded-lg border-gray-500 bg-opacity-70 text-white overflow-hidden focus:outline-none focus:font-bold px-3 py-1 hover:bg-opacity-50 mt-4 mr-8"
                            >
                                Guides <span className='text-xs'>▼</span>
                            </button>
                            <button
                                class={
                                    this.state.isOpen ? (
                                        ' cursor-default bg-black opacity-50 fixed inset-0 w-full h-full'
                                    ) : (
                                        'hidden'
                                    )
                                }
                                onClick={this.closeDropdown}
                                tabIndex="-1"
                            />
                            <div
                                class={
                                    this.state.isOpen ? (
                                        'absolute right-0 mt-2 w-48 bg-white rounded-lg py-2 shadow-xl'
                                    ) : (
                                        'hidden'
                                    )
                                }
                            >
                                <button class="block px-4 py-2 text-gray-800 hover:text-green-500"
                                onClick={() => this.guide("// Finding the sum of two variables\n\nlet a = 1\nlet b = 2\n\noutput(a+b)")}>
                                    Variables
                                </button>
                                <button class="block px-4 py-2 text-gray-800 hover:text-green-500 hover:font-bold"
                                onClick={() => this.guide('// Implementing basic logic\n\nlet a = 5\n\nif a = 5 then\n	output("a is equal to "+a.toString())\nend if\n\nif not (a = 6) then \n    output("a is not equal to 6")\nend if\n\nif a > 2 then\n    output("a is greater than 2")\nend if\n\nif not (a > 10) then \n    output("a is not greater than 10")\nend if\n\nif (a > 10) or (a>3) then\n\    output("a is greater than 10 or a is greater than 3")\nend if\n\nif (a>3) and (a<10) then\n    output("a is greater than 3 and less than 10")\nend if')}>
                                    Logic
                                </button>
                                <button href="#" class="block px-4 py-2 text-gray-800 hover:text-green-500 hover:font-bold"
                                onClick={() => this.guide('// What Hogwarts house do you belong to?\n\nlet house = "Hufflepuff"\n\nif house = "Gryffindor" then\n    output "Gryffindor"\nelse if house = "Slytherin" then\n    output "Slytherin"\nelse if house = "Ravenclaw" then\n    output "Ravenclaw"\nelse  then\n    output "Hufflepuff"\nend if')}>
                                    If and Else
                                </button>
                                <button href="#" class="block px-4 py-2 text-gray-800 hover:text-green-500 hover:font-bold"
                                onClick={() => this.guide("// Finding 10! (factorial)\n\nlet a = 1\n\nloop i from 1 to 10\n    a = a*i\nend loop\n\noutput a")}>
                                    Loops
                                </button>
                                <button href="#" class="block px-4 py-2 text-gray-800 hover:text-green-500 hover:font-bold"
                                onClick={() => this.guide('// Using modulus\n\nlet a = 17\nif (a mod 2) = 1 then\n    output("a is odd")\nelse then\n    output("a is even")\nend if\n\n// Using div\n\nlet b = 96\nlet c = 15\nlet quotient = Math.floor(b/c)\noutput("96 div is "+quotient.toString())')}>
                                    Mod and Div
                                </button>
                                <button href="#" class="block px-4 py-2 text-gray-800 hover:text-green-500 hover:font-bold"
                                onClick={() => this.guide('// Defining a few basic functions\n\nmethod add(a,b)\n    return a+b\nend add\n\nlet sum = add(3,2)\noutput sum')}>
                                    Functions
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className="border-green-500 border-2 hover:bg-transparent bg-green-500 py-3 px-8 rounded-full font-bold text-white hover:text-green-500 outline-none" onClick={this.run}>Run</button>
                </div>
                <form className="body-div flex body-class bg-gray-900 bg-opacity-50">    
                    <textarea value={this.state.textAreaValue} onChange={this.handleChange} placeholder="// Enter your pseudocode here:" className="mx-10 mb-16 mt-4 flex-1 bg-gray-900 p-5 text-white outline-none leading-relaxed"onKeyDown={e => {
                            if ( e.key === 'Tab' && !e.shiftKey ) {
                            document.execCommand('insertText', false, "\t");
                            e.preventDefault();
                            return false;
                        }}}/>

                    <div className="flex-1 mx-10 mb-16 mt-4 bg-gray-900 p-5 text-white">
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
// Implementation of function
// Sample list