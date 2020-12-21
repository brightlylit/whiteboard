import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Chat from './components/Chat';
import Canvas from './components/Canvas';
import JoinRoom from './components/JoinRoom'
import CreateRoom from './components/CreateRoom';
import DisplayImage from './components/DisplayImage'
import Raphael from "raphael";
import './App.css';
import {Grid, Row, Col, NewCol} from './components/ExampleStyledComponent'


class App extends Component {
  constructor(props){
    super(props)
    this.ENDPOINT = "http://127.0.0.1:3001";
    this.socket = socketIOClient(this.ENDPOINT);
    this.onClickHandler = this.onClickHandler.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.resp = []
    this.img = {}
  }
  state = {
    image: {},
    roomName:"",
    chatData:"",
    canvasData:"",
    inData:[],
    youSaidIsChecked: true,
    pClassName: undefined,
    imageHeight:""
  }
  componentDidMount= () => {
    this.paper = new Raphael("mycontainer", 500, 500);
    this.socket.on("FromAPI", data => {
      console.log("[componentdidmount]: ",data)
    });
    this.socket.on("response", inData => {
      this.resp.push(inData)
      this.setState({inData:this.resp})
      console.log("inData: ", inData)
    })
    this.socket.on("created_message", data => {
      this.setState({roomName:data},console.log("you created: "+data))
    })
    this.socket.on("joined_message", data => {
      this.setState({roomName:data},console.log("you joined: "+data))
    })
    this.socket.on("mouse_position_update", data => {
      let p = document.getElementById('containerHolder');
      let mousex = data.mx - p.offsetLeft
      let mousey = data.my - p.offsetTop - 20
      switch(data.canvasData){
        case "stress marker": let cir = this.paper.circle(mousex - 30, mousey, 5).attr({fill:"red"});
        break;
        case "syllable marker": let cir2 = this.paper.circle(mousex - 10, mousey, 5).attr({fill:"black"});
        break;
        default: let text1 = this.paper.text(mousex - 10, mousey, data.canvasData).attr({"font-size":"24px"});
        break;
      }

    })
    this.socket.on("receiveImage", function(data) {
      let DOM_img = document.createElement("img");
      DOM_img.src = data.buffer;
      DOM_img.style.height = "100px";
      let holder = document.getElementById("imgHolder")
      holder.insertBefore(DOM_img, holder.firstChild)
    });
    
  }
  
  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.img = event.target.files[0];
      console.log("event.target.files[0].size: ",event.target.files[0].size)
      if(event.target.files[0].size > 1000000){
        alert("Too big. Choose an image less than 1MB in size.")
      }else{
        this.setState({
          image: URL.createObjectURL(this.img),
          imageHeight:"100px"
        });
        let dataURI = URL.createObjectURL(this.img)
        this.socket.emit("sendImage", dataURI, this.state.roomName) 
      }
      
    }
  };
  onChangeHandler = (event) =>{
    this.setState({chatData:event.target.value}) 
  }
  onCanvasInputChange = (event) =>{
      this.setState({canvasData:event.target.value})    
   
  }
 
  canvasOnClick = (e) => {
    console.log("canvasOnClick this.state.canvasData: ",this.state.canvasData)
    
    this.socket.emit('mouse_position', {mx : e.pageX, my : e.pageY, canvasData:this.state.canvasData, roomName:this.state.roomName})
    
  }
  onClickHandler = () => {
    let payload = {room:this.state.roomName, chatData:this.state.chatData} 
    this.socket.emit("message", payload) 
    console.log("onclickhandler") 
  }
  createTheRoom = (room) =>{
    this.socket.emit("createRoom", room)
    alert("room is: "+room)
  }
  joinTheRoom = (room) => {
    this.socket.emit("joinTheRoom", room)
  }
 
  render(){
    return (
      <Grid>
        <Row>
          <div className="header">
              
              <CreateRoom
                createTheRoom={this.createTheRoom}
              />
              <JoinRoom
                joinTheRoom={this.joinTheRoom}
              />    
          </div>
        </Row>
        <Row>
          <NewCol>
            <div className="column left" id="imgHolder">
              {/*<MaterialsChooser/>*/}
              <DisplayImage
                imgSrc={this.state.image}
                changeImage={this.onImageChange}
                myHeight={this.state.imageHeight}
              />
              <span>æ</span><span>ɒ</span><span>b</span><span>ð</span>eəfɡıkŋprsʤ
            </div>
          </NewCol>
          <NewCol>
            <div className="column center">
              <Chat
                pClassName={ this.state.pClassName }
                spanVal={ this.state.inData } 
                onChange={ this.onChangeHandler }
                onClick={ this.onClickHandler }
                idCorrect={"Correct"}
                idInCorrect={"Incorrect"}
              /> 
            </div>
          </NewCol>
          <NewCol>
            <div id="containerHolder" className="hiddenOverflowColumn">
              <Canvas
                onClick={this.canvasOnClick}
                id={"mycontainer"}
                canvasInputChangeData={this.onCanvasInputChange}
              />
            </div>
          
          </NewCol>
        </Row>
       
        

      </Grid>
        
         
          
         
          
      
    )
  } 
}


export default App;

/*<p>
      <span>{response}</span><br/>
      <input value={} type="text"/>
      <button onClick={onClickHandler} name="submit">submit</button>
    </p>*/