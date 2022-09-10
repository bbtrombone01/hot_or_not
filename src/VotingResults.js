import React from "react";

const VotingResults =(props)=> {

    let vaule = props.hot + props.not
    
    let gradient = null 

    let message = ""


    if(props.not > props.hot){ 

       let  messagePercentage = Math.round(props.not/vaule*100)

        gradient = 100 - messagePercentage

        gradient = gradient.toString()

        message = `${messagePercentage}% voted not`

        
    }else if( props.hot > props.not){


        gradient = Math.round(props.hot/vaule*100)

        gradient = gradient.toString()

        message = `${gradient}% voted hot`

    }else {
        gradient = "50"

        message = ` this is a very divisive thermostat.  Equal parts hot and not.`
    }

    return <div className="displayvotingResults">
        <p style={
            
            
            {
                width: "75%",
                textAlign: "center",
                color: "white",
                backgroundImage: `linear-gradient(90deg, rgba(255,61,74) ${gradient}%, rgba(93,214,245) ${gradient}%`, borderRadius: "30px" }}>  {message}  </p>


    </div>
}


export default VotingResults