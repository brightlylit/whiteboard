import React, {Component} from 'react';

class Canvas extends Component{
    
    render(){
        return(
            <div>
                <div>
                    <select
                        onChange={this.props.canvasInputChangeData}
                        id={"mySelect"}
                    >
                        <option>select tool</option>
                        <option>stress marker</option>
                        <option>syllable marker</option>
                        <option>æ</option>
                        <option>ɒ</option>
                        <option>b</option>
                        <option>ð</option>
                        <option>ŋ</option>
                    </select>
                    <label>
                        <input 
                        type="text" 
                        onChange={this.props.canvasInputChangeData}
                        id={"myInput"}
                        />
                        <button
                        type="submit"
                        >submit
                        </button>
                    </label> 
                </div>
                
                <div className="CanvasClass"
                     id={this.props.id}
                     onClick={this.props.onClick}
                >
                </div>
            </div>

        )
    }
}
export default Canvas;