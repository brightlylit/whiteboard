import React, {Component} from 'react';

class JoinRoom extends Component{
    constructor(props){
        super(props)
    }
    state = {roomName:""}
    onClick = () => {
        this.props.joinTheRoom(this.state.roomName)
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
                >Join Room
                </button>
            </React.Fragment>
        )
    }
}
export default JoinRoom