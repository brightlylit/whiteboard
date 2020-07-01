import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Chat from './components/Chat'
import './App.css'

class App extends Component {
  constructor(props){
    super(props)
    this.ENDPOINT = "http://127.0.0.1:3001";
    this.socket = socketIOClient(this.ENDPOINT);

    this.onClickHandler = this.onClickHandler.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.resp = []
  }
  state = {
    outData:"",
    inData:[],
    youSaidIsChecked: true,
    pClassName: undefined,
  }
  
  
  componentDidMount= () => {
    this.socket.on("FromAPI", data => {
      console.log(data)
    });
    this.socket.on("response", inData => {
      this.resp.push(inData)
      this.setState({inData:this.resp})
    })
    
  }
  onChangeHandler = (event) =>{
    this.setState({outData:event.target.value})
    
  }
  onClickHandler = () => {
    if(this.state.youSaidIsChecked) {
      let str = "You said: " + '"' + this.state.outData + '"'    
      this.state.outData = str // you're not supposed to mutate state, but setState is async and so doesn't update on click
      this.socket.emit("message", this.state.outData) 
      this.setState({pClassName:"blue"})
    }else{
     //this.props.myref.current.innerHTML = "<h1>da</h1>"
      this.socket.emit("message", this.state.outData)
    }
    
  }
  youSaidChangedHandler = () => {
     
    if(this.state.youSaidIsChecked){
      this.setState({youSaidIsChecked:false})
      console.log("yousaid is: ", this.state.youSaidIsChecked)
      
    }else{
      this.setState({youSaidIsChecked:true})
    }
  }
  render(){
    return (
      <div>
        <Chat
        pClassName={ this.state.pClassName }
        spanVal={ this.state.inData } 
        onChange={ this.onChangeHandler }
        onClick={ this.onClickHandler }
        idCorrect={"Correct"}
        idInCorrect={"Incorrect"}
       />
       <input type="checkbox"
                id={this.props.idYouSaid}
                name={"yousaid"}
                checked={this.state.youSaidIsChecked}
                onChange={this.youSaidChangedHandler}
                />
                <label htmlFor={"yousaid"}>
                    You said
                </label>
                <input type="checkbox"
                id={"correct"}
                name={"correct"}
                value={"correct"}
                />
                <label htmlFor={"correct"}>
                    Correct
                </label>
                <input type="checkbox"
                id={"incorrect"}
                name={"incorrect"}
                value={"incorrect"}
                />
                <label htmlFor={"incorrect"}>
                    Incorrect
                </label>
      </div>
      
    )
  } 
}

export default App;

/*<p>
      <span>{response}</span><br/>
      <input value={} type="text"/>
      <button onClick={onClickHandler} name="submit">submit</button>
    </p>*/