import React from "react";
import { WiCloudDown } from "react-icons/wi";
import ContextStore from "../../ContexStore"
export default class MainWeather extends React.Component {
    static contextType = ContextStore;
    state = {
        locationName: ''
    };
    
    onLocationNameChange(e) {
        this.setState({ locationName: e.target.value })
    }

    onSelectCity(e) {
        const { locationName } = this.state;
        e.preventDefault();
        this.context.eventEmitter.emit("updateWeather", locationName);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSelectCity.bind(this)}>
                    <div className="input-group mb-4">
                        <input type="text" className="form-control" placeholder="Select location" onChange={this.onLocationNameChange.bind(this)} />
                        <div className="input-group-append">
                            <button className="btn text-white d-none d-md-inline custom-button rounded" type="submit">Get Weather</button>
                            <button className="btn text-white center d-md-none custom-button" type="submit"><WiCloudDown size="21px" /></button>
                        </div>
                    </div></form>
                <div className="row">
                    <div className="col-md-9">
                        <h2 className="m-md-3">
                            <p>Location: {this.context.location}</p>
                        </h2>
                        <h2 className="m-md-3">
                            <p>Temperature: {this.context.temp_c}°C</p>
                        </h2>
                        <h2 className="m-md-3">
                            <p>Humidity: {this.context.humidity}%</p>
                        </h2>
                        <h2 className="m-md-3">
                            <p>Conditions: {this.context.text}</p>
                        </h2>
                    </div>
                    <div className="col-md-3 d-md-flex d-none justify-content-center align-items-center">
                        <img className="current-weather-icon" src={`https://www.weatherbit.io/static/img/icons/${this.context.iconCode}.png`} alt="" />
                    </div>
                    <div className="col mb-3 text-center">
                        <button className="btn col-6 text-white custom-button rounded" onClick={this.context.updateProfiles}>Add to profile</button>
                    </div>
                </div>
            </div>
        );
    }
}