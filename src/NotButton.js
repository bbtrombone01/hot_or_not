import React from "react";
import Cold from "../src/stockImages/not-button.png"



const NotButton = (props)=>{


    return <div className="votingResults">
        <img onClick={props.onClick} className="votingOption" src={Cold} alt ="not"/>
    </div>
}

export default NotButton