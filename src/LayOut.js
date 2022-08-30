import React from "react";

const  LayOut =  ()=>{

    if(!localStorage.getItem("thermostatsObjects") ){

          fetch("http://localhost:8000/random", {
           headers: {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*'
             },
       }).then( response => response.json()).then( data => setToLocalStorage(data))
            
    }

    function setToLocalStorage (data){

        localStorage.setItem("thermostatsObjects", JSON.stringify(data))
        localStorage.setItem("index", 1)

    }

    return <div>
        <p> replace with other componets</p>
    </div>
}


export default LayOut 
