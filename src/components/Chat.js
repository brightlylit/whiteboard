import React, { Component } from 'react'
const cssRef = React.forwardRef((props, ref)=>{
    
})
class Chat extends Component {
   
    render(){
        
        return (
            
            <div>
                {this.props.spanVal.map((el, i)=> {
                    return (
                        
                        <p 
                        className={ this.props.pClassName } 
                       
                        key={ i }>
                            { el }
                            </p>
                        
                       
                    )
                    
                })}
                <input type="text"
                    onChange = {this.props.onChange} 
                />
                <button type="submit"
                    onClick = {this.props.onClick}
                >submit
                </button><br/>
                
            </div>

        )
    }
}

export default Chat;