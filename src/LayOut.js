import React, { Component } from "react";
import Image from "./Image";
import HotButton from "./HotButton";
import HotOrNotTitle from "./HotOrNotTilte";
import NotButton from "./NotButton";

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

        let thermoResponse = await fetch("http://localhost:8000/random", {
            headers: {
                'Content-Type': 'application/json',
              },})

           let  thermoObject = await thermoResponse.json()


           this.updateThermostatStates(thermoObject, this.state.index)
 
     }


     // updates state 
     updateThermostatStates =(data, index)=>{
 
         this.setState({currentThermoImageUrl: data[index].image, thermoStatObject: data, currentThermoHot: data[index]["hot"], currentThermoNot: data[index]["not"]})
        
    }

    // onclick function for getting the image of the next theromostat
    // needs logic for when you have no more theromostats to look at 
    getNextThermoImage =()=>{


        this.setState({index: this.state.index + 1, voted: false})

        this.updateThermostatStates(this.state.thermoStatObject, this.state.index + 1)
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

        // debugger

        if(event.target.alt === "hot"){
           newHot = this.state.currentThermoHot + 1

            
        }else {
            newNot = this.state.currentThermoNot + 1
        }

        // debugger


        fetch(`http://localhost:8000/increment`, {
            method: "PATCH",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify({
                image: test,
                hot: newHot,
                not: newNot
            })
        }).then( res => res.json()).then(data => console.log(data))
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

            return <div>

                <button onClick={this.getNextThermoImage}> click me</button> 
            </div> 
        }
       }

    

        return <div>

       

            <HotOrNotTitle />

            <Image image={this.state.currentThermoImageUrl} />

             
            {/* <div className="VotingOptionsContainer">

                <HotButton />

                <NotButton />

            </div> */}
             {renderAction()}


            {/* <button onClick={this.getNextThermoImage}> click me</button> */}

        </div>
    }

}

export default LayOut 
