import React from "react";

const Image =(props) =>{

    return <div className="thermoImageParent">
        <img 
            className="thermoImage"
            crossOrigin= "anonymous"
            src={`https://whispering-ridge-23084.herokuapp.com/${props.image}`} alt="testing" />
    </div>
}


export default Image