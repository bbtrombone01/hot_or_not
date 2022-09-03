import React, { Component } from "react";
import Image from "./Image";
import HotButton from "./HotButton";
import HotOrNotTitle from "./HotOrNotTilte";
import NotButton from "./NotButton";

class  LayOut extends Component{

    // 

    state = {
        thermoStatObject: null,
        index: 1,
        currentThermoImageUrl: null
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
 
         this.setState({currentThermoImageUrl: data[index].image, thermoStatObject: data})
        
    }

    // onclick function for getting the image of the next theromostat
    // needs logic for when you have no more theromostats to look at 
    getNextThermoImage =()=>{


        this.setState({index: this.state.index + 1})

        this.updateThermostatStates(this.state.thermoStatObject, this.state.index + 1)
    }

    render(){

        return <div>

            <HotOrNotTitle />

            <Image image={this.state.currentThermoImageUrl} />

            <div className="VotingOptionsContainer">

                <HotButton />

                <NotButton />

            </div>


            {/* <button onClick={this.getNextThermoImage}> click me</button> */}

        </div>
    }

}

export default LayOut 
