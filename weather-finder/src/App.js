import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Home from "./components/Home/Home";
import { SecureRoute, ImplicitCallback } from "@okta/okta-react";
import Modal from "./components/Home/main/Modal";
import RegistrationForm from "./components/auth/RegistrationForm";
import config from "./app.config";
import LoginPage from "./components/auth/LoginPage";
import axios from "axios";
import ContextStore from "./ContexStore";
import { Route } from "react-router-dom";

const WEATHER_KEY = "ed4c130b02024734906162a48dc7aaee";
/**
 * Component główny w którym wywoływane są inne moduły, zawiera podstawowe metody oraz inicjalizuje podstawowe stany
 * @component
 */
class App extends React.Component {
  constructor(props) {
	super(props);
	/** Utworzenie stanów początkowych */
    this.state = {
      cityName: "Rzeszow",
      numForecastDays: 4,
      show: false,
      isEnabled: true,
      profiles: [],
    };
  }

  /**
   * Funkcja zamykająca okno modalne
   */
  hideModal = () => {
    this.setState({ show: false });
  };

  /**
   * Funkcja pobierająca dane z API pogodowego
   */
  updateWeather() {
    const { cityName, numForecastDays } = this.state;

    const forecastURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${WEATHER_KEY}&days=${numForecastDays}`;
    const currentWeatherURL = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${WEATHER_KEY}`;

    axios
      .all([axios.get(forecastURL), axios.get(currentWeatherURL)])
      .then(
        axios.spread((forecastWeatherData, currentWeatherData) => {
          this.setState({
            location: currentWeatherData.data.data[0].city_name,
            temp_c: currentWeatherData.data.data[0].temp,
            humidity: currentWeatherData.data.data[0].rh,
            text: currentWeatherData.data.data[0].weather.description,
            iconCode: currentWeatherData.data.data[0].weather.icon,
            forecastWeather: forecastWeatherData.data,
          });
        })
      )
      .catch((err) => {
        if (err)
          this.setState({
            show: true,
          });
      });
  }

  /**
   * Funkcja dodająca lokalizację wraz z informacjami pogodowymi do profilu
   */
  updateProfiles = () => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, this.state.forecastWeather],
    }));
  };
  /**
   * Funkcja usuwająca lokalizację z profilu
   */
  removeProfile = (i) => {
    this.setState((state) => {
      const profiles = state.profiles.filter((profile, j) => i !== j);
      return {
        profiles,
      };
    });
  };
  /**
   * Wywołanie metody updateWeather()
   */
  componentDidMount() {
    const { eventEmitter } = this.props;
    this.updateWeather();
    if (!this.cityName) {
      this.setState({
        isEnabled: false,
      });
    }
    eventEmitter.on("updateWeather", (data) => {
      this.setState({ cityName: data }, () => this.updateWeather());
    });
  }
  /**
   * Renderowanie componentów, ustawienie providera dla kontekstu, który umożliwa dostęp globalny dla atrybutów oraz metod
   */
  render() {
    return (
      <div className="container-lg-fluid">
        <ContextStore.Provider
          value={{
            ...this.state,
            hideModal: this.hideModal,
            toggleLogin: this.toggleLogin,
            updateProfiles: this.updateProfiles,
            removeProfile: this.removeProfile,
            eventEmitter: this.props.eventEmitter,
            succesfullLogin: this.succesfullLogin,
            setRedirect: this.setRedirect,
            logOut: this.logOut,
          }}
        >
          {this.state.show ? <Modal /> : null}
          <main>
            <Route
              path="/login"
              render={() => <LoginPage baseUrl={config.url} />}
            />
            <Route path="/implicit/callback" component={ImplicitCallback} />
            <Route path="/register" component={RegistrationForm} />
            <SecureRoute path="/" exact component={Home} />
          </main>
        </ContextStore.Provider>
      </div>
    );
  }
}
export default App;
