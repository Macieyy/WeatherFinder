import React from "react";
import MainWeather from "./MainWeather";
import ForecastWeather from "./ForecastWeather";
import ContextStore from "../../../ContexStore";

/**
 * Komponent główny dla sekcji z aktualną pogodą
 * @component
 */
class MainSection extends React.Component {
  static contextType = ContextStore;
  render() {
    return (
      <div className="col-xl-6 text-white" id="main">
        <h1 className="text-center pt-4">Weather Finder</h1>
        <div className="col-12 mt-4">
          <MainWeather />
          <div className="col-12 mt-1 d-flex flex-row border-top">
            {this.context.forecastWeather &&
              this.context.forecastWeather.data.map((day, idx) => {
                return <ForecastWeather day={day} key={idx} />;
              })}
          </div>
        </div>
      </div>
    );
  }
}
export default MainSection;
