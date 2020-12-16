import React, { Component } from 'react';

class CreateRoom extends Component {
    constructor(props){
        super(props)

    }
    state = { roomName: ""}
    
    onClick = () => {
       // this.socket.emit("createRoom", this.state.roomName) 
        this.props.createTheRoom(this.state.roomName)       
    }
    onChangeHandler = (event) => {
        this.setState({roomName:event.target.value})
    }
   
    
    render(){
        return(
            <React.Fragment>  
                <input 
                    type="text" 
                    onChange={this.onChangeHandler}
                />
                <button 
                    type="submit"
                    onClick = {this.onClick}
                >Create Room
                </button>
            </React.Fragment>

        )
       

    }
}
export default CreateRoom
