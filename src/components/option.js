import React from "react";

class OptionPiece extends React.Component{
    render(){
        let name = this.props.name
        return(
            <option value={name}>{name}</option>
        )
    }
}

export default OptionPiece