import React from "react";
import axios from "axios";

export default class locationList extends React.Component{
    state ={
        locations: []
    };

    componentDidMount() {
        axios.get('http://localhost:8080/mapInfo')
        .then(res=> {
            const locations = res.data;
            this.setState({locations});
        });

    }
    render(){
        return(
            <select>
                {this.state.locations.map(location=> 
                    <option>
                        {location.label}
                    </option>)}
            </select>
        );
    }
}