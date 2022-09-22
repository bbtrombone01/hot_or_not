import React, { Component } from "react";
import Image from "./Image";
import HotButton from "./HotButton";
import HotOrNotTitle from "./HotOrNotTilte";
import NotButton from "./NotButton";
import VotingResults from "./VotingResults";

class  LayOut extends Component{


    state = {
        index: 1,
        currentThermoNot: 0,
        currentThermoHot: 0,
        voted: false,
        fetched: false 
    }

    componentDidMount (){

        
            this.fetchThermostats()

    }

    // fetches all thermostats 
    fetchThermostats =  async () => {


        // will fetch all of the thermostats,  does not run if the user refershes the page 
        if(!sessionStorage["thermostat"]){

            let thermoResponse = await fetch("https://whispering-ridge-23084.herokuapp.com/random", {
                headers: {
                    'Content-Type': 'application/json',
                  },})
    
               let  thermoObject = await thermoResponse.json()
    
               sessionStorage.setItem("thermostat", JSON.stringify(thermoObject))
            
        } 
    
        // do not remove, this cause state change, <Image needs for state change to bring up image instead of alt

        this.setState({fetched: true})

     }




     // updates state 
     updateThermostatStates =(data, index)=>{

         this.setState({currentThermoImageUrl: data[index].image, thermoStatObject: data, currentThermoHot: data[index]["hot"], currentThermoNot: data[index]["not"]})
        
    }

    // onclick function for getting the image of the next theromostat
    getNextThermoImage =()=>{

    
    if(JSON.parse(sessionStorage["thermostat"])[this.state.index + 1] === undefined ){
        
        alert("you have run out of thermostats")
        
    }else {
               
             this.setState({index: this.state.index + 1, voted: false})
           
         }

    }

    vote =(event)=>{

        this.setState({voted: true})

        this.postRequest(event)

    }


    postRequest =(event)=> {
        
        let test = JSON.parse(sessionStorage["thermostat"])[this.state.index]["image"]
        
        test = test.split("uploads/")
        
        test = test[1]
        
        let newHot = JSON.parse(sessionStorage["thermostat"])[this.state.index]["hot"]

        let newNot = JSON.parse(sessionStorage["thermostat"])[this.state.index]["not"]

        if(event.target.alt === "hot"){
           newHot ++

            
        }else {

            newNot ++

        }

        fetch(`https://whispering-ridge-23084.herokuapp.com/increment`, {
            method: "PATCH",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({
                image: test,
                hot: newHot,
                not: newNot
            })
        }).then( res => res.json())
        .then(data => this.updateHotOrNotState(data))
    }

    updateHotOrNotState = (data)=> {

            this.setState({currentThermoHot: data["hot"], currentThermoNot: data["not"] })
   
        }

    render(){

        const renderImage =()=>{

            if(this.state.fetched){
                
                return <Image index={this.state.index} />
            }

        }

        let voted = this.state.voted


       const renderAction =()=>{

        if(!voted){
            return  (<div className="VotingOptionsContainer">

            <HotButton onClick={this.vote}  />

            <NotButton onClick={this.vote} />

        </div> )
        }else {

    return <div className="VotingInfoContainer" >
                
                <VotingResults hot ={this.state.currentThermoHot} not ={this.state.currentThermoNot}/>

                <div >

                    <button className="nextButton" onClick={this.getNextThermoImage}> next</button> 
                
                </div>

            </div> 
        }

       }

        return <div>

            <HotOrNotTitle />

             {renderImage()}

             {renderAction()}

        </div>
    }

}

export default LayOut 
