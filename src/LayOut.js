import React, { Component } from "react";
import Image from "./Image";
import HotButton from "./HotButton";
import HotOrNotTitle from "./HotOrNotTilte";
import NotButton from "./NotButton";
import VotingResults from "./VotingResults";

class  LayOut extends Component{


    state = {
        thermoStatObject: null,
        index: 1,
        currentThermoImageUrl: null,
        currentThermoNot: 0,
        currentThermoHot: 0,
        voted: false
    }

    componentDidMount (){

            this.fetchThermostats()

    }

    // fetches all thermostats 
    fetchThermostats =  async () => {

        let thermoResponse = await fetch("https://whispering-ridge-23084.herokuapp.com/random", {
            headers: {
                'Content-Type': 'application/json',
              },})

           let  thermoObject = await thermoResponse.json()

           this.updateThermostatStates(thermoObject, this.state.index)
 
     }


     // updates state 
     updateThermostatStates =(data, index)=>{

        // debugger
 
         this.setState({currentThermoImageUrl: data[index].image, thermoStatObject: data, currentThermoHot: data[index]["hot"], currentThermoNot: data[index]["not"]})
        
    }

    // onclick function for getting the image of the next theromostat
    // needs logic for when you have no more theromostats to look at 
    getNextThermoImage =()=>{


        // debugger  

            if(this.state.thermoStatObject[this.state.index]){

                        this.setState({index: this.state.index + 1, voted: false})
                
                        this.updateThermostatStates(this.state.thermoStatObject, this.state.index + 1)
            }else {

                alert("you have run out of thermostats")

            }

    
    }

    vote =(event)=>{

        this.setState({voted: true})

        this.postRequest(event)

    }


    postRequest =(event)=> {

        let test = this.state.currentThermoImageUrl

        test = test.split("uploads/")

        test = test[1]

        let newHot = this.state.currentThermoHot

        let newNot = this.state.currentThermoNot

        if(event.target.alt === "hot"){
           newHot = this.state.currentThermoHot + 1

            
        }else {
            newNot = this.state.currentThermoNot + 1
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

        let voted = this.state.voted


       const renderAction =()=>{

        if(!voted){
            return  (<div className="VotingOptionsContainer">

            <HotButton onClick={this.vote} postReq ={this.postRequest} />

            <NotButton onClick={this.vote} postReq={this.postRequest} />

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

            <Image image={this.state.currentThermoImageUrl} />

             {renderAction()}

        </div>
    }

}

export default LayOut 
