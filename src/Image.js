import React from "react";

const Image =(props) =>{ 


    // on new table image doesn't load, props dones't chanve 

    // console.log(props)
    let imgURl = ""

    if(sessionStorage["thermostat"] !== undefined){

        imgURl = `https://whispering-ridge-23084.herokuapp.com/${JSON.parse(sessionStorage.thermostat)[props.index].image} `
        
    }

    // if(props.thermoObject != null){

    //     if(props.thermoObject[props.index] !== undefined){

    //         imgURl = `https://whispering-ridge-23084.herokuapp.com/${props.thermoObject[props.index].image}`

    //     }else{

         
    //         imgURl =""
    //     }

    //     // debugger
    // }


    

    // if (props.thermoObject !== null ||  undefined){
        
    //     imgURl = `https://whispering-ridge-23084.herokuapp.com/${props.thermoObject[props.index].image}`
    // }else {
    //     imgURl = " "
    // }

    return <div className="thermoImageParent">
        <img 
            className="thermoImage"

            src={imgURl}
            alt="testing" />
    </div>
}


export default Image