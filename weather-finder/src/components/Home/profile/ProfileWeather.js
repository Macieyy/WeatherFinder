import React from "react";
import Expand from "../../../resources/expand.svg";
import Exit from "../../../resources/Cross.svg";
import Location from "../../../resources/loc.svg";
import Humidity from "../../../resources/humidity.svg";
import Temp from "../../../resources/temp.svg";
import WeatherChart from "./WeatherChart";
import ContextStore from "../../../ContexStore";

/**
 * Komponent okna profilowego z aktualną pogodą.
 * @component
 */
class ProfileWeather extends React.Component {
  static contextType = ContextStore;
  constructor(props) {
    super(props);
    /** Utworzenie stanów początkowych */
    this.state = {
      show: false,
    };
  }
  /**
   * Metoda zmienia stan {show} na true/false, który zamyka lub otwiera okno z wykresem
   */
  toggleChart = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  render() {
    const profile = this.props;

    return (
      <div className="column border border-white text-white mt-3">
        <div className="d-flex flex-row justify-content-end border-bottom profile-top-edge">
          {this.state.show ? (
            <WeatherChart profile={profile} toggleChart={this.toggleChart} />
          ) : null}
          <div className="p-2" onClick={this.toggleChart}>
            <img src={Expand} alt="" id="icon" />
          </div>
          <div
            className="p-2"
            onClick={() => {
              this.context.removeProfile(this.props.index);
            }}
          >
            <img src={Exit} alt="" id="icon" />
          </div>
        </div>
        <div className="d-flex flex-row pt-2 ">
          <div className="col-7 pl-4 ml-md-3  profile-weather-container font-weight-bold">
            <div className="row">
              <div>
                <p className="d-none d-md-flex text-dark">Location:&#160;</p>
                <img className="d-md-none pr-2" src={Location} alt="" />
              </div>
              <div>
                <p>{profile.city_name}</p>
              </div>
            </div>
            <div className="row">
              <div>
                <p className="d-none d-md-flex text-dark">Humidity:&#160;</p>
                <img className="d-md-none pr-2" src={Humidity} alt="" />
              </div>
              <div>
                <p>{profile.data[0].rh}%</p>
              </div>
            </div>
            <div className="row">
              <div>
                <p className="d-none d-md-flex text-dark">Temperature:&#160;</p>
                <img className="d-md-none pr-2" src={Temp} alt="" />
              </div>
              <div>
                <p>{profile.data[0].temp}°C</p>
              </div>
            </div>
            <div className="row d-none d-md-flex">
              <div>
                <p className="text-dark">Conditions:&#160;</p>
              </div>
              <div>
                <p>{profile.data[0].weather.description}</p>
              </div>
            </div>
          </div>
          <div className="col-4 column d-flex justify-content-center profile-weather-icon align-items-center">
            <img
              src={`https://www.weatherbit.io/static/img/icons/${profile.data[0].weather.icon}.png`}
              className="img-fluid"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileWeather;
