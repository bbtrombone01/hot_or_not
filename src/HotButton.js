import React from "react";
import Hot from "../src/stockImages/hot-button.png"


const HotButton =(props)=>{

    // debugger
    return <div  >

        <img onClick={props.onClick} className="votingOption" src={Hot} alt="hot" />

    </div>
}


export default HotButton