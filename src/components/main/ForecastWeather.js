import React from "react";

export default class ForecastWeather extends React.Component {
    render() {
        const { day } = this.props;
        if (!day) return null;
        return (
            <div className="col-3 d-flex flex-column align-items-center pr-5 pt-3">
                <div className="text-center next-day-data d-none d-md-inline pb-1">{day.datetime}</div>
                <div className="text-center next-day-temperature d-flex flex-row">
                    {day.temp}°C
                </div>
                <img src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`} className="next-day-icon" alt="" />
                <p className="text-center next-day-conditions">{day.weather.description}</p>
            </div>
        );
    }
}
