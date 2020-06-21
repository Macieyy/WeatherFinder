import React from "react";
import { Line } from "react-chartjs-2";
import Slider from "react-input-slider";
import ContextStore from "../../../ContexStore";

/**
 * Komponent zawierający wykres pogodowy.
 * @component
 */
class WeatherChart extends React.Component {
  static contextType = ContextStore;
  constructor(props) {
    super(props);
    /** Utworzenie stanów początkowych */
    this.state = {
      x: 0,
      data: {
        labels: this.props.profile.data.map((day) => day.datetime),
        datasets: [
          {
            label: " Avg Temperature [°C]",
            backgroundColor: "rgba(238,193, 17, 0.75)",
            data: this.props.profile.data.map((day) =>
              ((day.app_max_temp + day.app_min_temp) / 2).toFixed()
            ),
          },
          {
            label: "Humidity [%]",
            backgroundColor: "rgba(37,128, 218, 0.75)",
            data: this.props.profile.data.map((day) => day.rh),
          },
        ],
      },
    };
  }

  handleClick = (x) => {
    this.setState({ x: parseFloat(x.toFixed(2)) });
  };

  render() {
    const { profile } = this.props;
    return (
      <div className="modal display-block">
        <section className="modal-main col-11 col-lg-8 rounded">
          <h1 className="text-center text-secondary m-3">
            {profile.city_name}
          </h1>
          <div className="d-none d-md-flex justify-content-center">
            {" "}
            <div className="h-75 w-75">
              <Line data={this.state.data} />
            </div>{" "}
          </div>
          <div className="row justify-content-center d-md-none">
            <div>
              <div className="m-1">
                <img
                  src={`https://www.weatherbit.io/static/img/icons/${
                    profile.data[this.state.x].weather.icon
                  }.png`}
                  alt=""
                />
              </div>
              <div className="m-1">
                {" "}
                {(
                  (profile.data[this.state.x].app_max_temp +
                    profile.data[this.state.x].app_min_temp) /
                  2
                ).toFixed()}
                °C
              </div>
              <div className="m-1">
                Humidity: {profile.data[this.state.x].rh}%
              </div>
              <div className="m-1">{profile.data[this.state.x].datetime}</div>
              <Slider
                axis="x"
                xstep={1}
                xmin={0}
                xmax={6}
                x={this.state.x}
                onChange={({ x }) => this.setState({ x: x })}
              />
            </div>
          </div>
          <div className="col text-center">
            <button
              className="btn btn-primary m-3"
              onClick={this.props.toggleChart}
            >
              Close
            </button>
          </div>
        </section>
      </div>
    );
  }
}
export default WeatherChart;