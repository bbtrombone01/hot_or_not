import React from "react";

const Image =(props) =>{ 

    let imgURl = ""

    if(sessionStorage["thermostat"] !== undefined){

        imgURl = `https://whispering-ridge-23084.herokuapp.com/${JSON.parse(sessionStorage.thermostat)[props.index].image} `
        
    }

    return <div className="thermoImageParent">
        <img 
            className="thermoImage"

            src={imgURl}
            alt="testing" />
    </div>
}


export default Image