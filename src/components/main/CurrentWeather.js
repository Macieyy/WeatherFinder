import React from "react";

export default class CurrentWeather extends React.Component {
    render() {
        const { location, temp_c, humidity, text, iconURL } = this.props;
        return (
            <div className="row">
                <div className="col-md-9">
                    <h2 className="m-md-3">
                        <p>Location: {location}</p>
                    </h2>
                    <h2 className="m-md-3">
                        <p>Temperature: {temp_c} °C</p>
                    </h2>
                    <h2 className="m-md-3">
                        <p>Humidity: {humidity} %</p>
                    </h2>
                    <h2 className="m-md-3">
                        <p>Conditions: {text}</p>
                    </h2>
                </div>
                <div className="col-md-3 d-md-flex d-none justify-content-center align-items-center">
                    <img className="current-weather-icon" src={iconURL} alt="" />
                </div>
            </div>
        )
    }
}
