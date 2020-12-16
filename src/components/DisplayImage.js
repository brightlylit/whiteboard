import React, { Component } from "react";

class DisplayImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  

  render() {
    return (
      <React.Fragment>
       
            <img 
                src={this.props.imgSrc}
                height={this.props.myHeight} 
            />
            <h1>Select Image</h1>
            <input 
                type="file" 
                name="myImage" 
                onChange={this.props.changeImage} 
            />
          
      </React.Fragment>
    );
  }
}
export default DisplayImage;