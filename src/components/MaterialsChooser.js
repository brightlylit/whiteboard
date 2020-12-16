import React, {Component} from 'react';

class MaterialsChooser extends Component{
    constructor(props){
        super(props)

    }
    state={display:""}
    onChangeHandler = (e) => {
        alert()
    }
    render(){
        return(
            <div>
                <select
                    onChange={this.onChangeHandler}
                >
                    <option>-- select --</option>
                    <option>past continuous</option>
                    <option>phonemic chart</option>
                    <option>Google image search</option>
                </select>
                <div>
                {/*<img alt="asdad" src={require('../imgs/past_continuous.png')}/>*/}   
                </div>

            </div>
            

        )
    }
}
export default MaterialsChooser;