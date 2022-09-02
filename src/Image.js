import React,{Component} from "react";


class Image extends Component{ 


// needs to be a pure function function 

    render(){

        return <div>

            <img
              crossOrigin="anonymous"
              className = "testing" src={`http://localhost:8000/${this.props.image}`} alt="testing"/>
        </div>
    }


}


export default Image