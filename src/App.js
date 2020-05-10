import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import MainSection from "./components/main/index"
import ProfileSection from "./components/profile/index";
import Modal from "./components/main/Modal";
import UserBar from "./components/main/UserBar";
import LoginPage from "./components/Loginpage/index";
import axios from "axios";
import ContextStore from "./ContexStore";

const WEATHER_KEY = "ed4c130b02024734906162a48dc7aaee";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Rzeszow",
      numForecastDays: 4,
      show: false,
      isEnabled: true,
      loggedIn: true,
      profiles: []
    }
    this.removeProfile = this.removeProfile.bind(this);
  }


  hideModal = () => {
    this.setState({ show: false });
  };


  toggleLogin = () => {
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }));
  };

  updateWeather() {
    const { cityName, numForecastDays } = this.state;

    const forecastURL =`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${WEATHER_KEY}&days=${numForecastDays}`;
    const currentWeatherURL = `https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${WEATHER_KEY}`;
    
    axios.all([
      axios.get(forecastURL),
      axios.get(currentWeatherURL)
    ])
    .then(axios.spread((forecastWeatherData, currentWeatherData) => {
      this.setState({
        location: currentWeatherData.data.data[0].city_name,
        temp_c: currentWeatherData.data.data[0].temp,
        humidity: currentWeatherData.data.data[0].rh,
        text: currentWeatherData.data.data[0].description,
        iconCode: currentWeatherData.data.data[0].weather.icon,
        forecastWeather: forecastWeatherData.data
      })
    })).catch((err) => {
        if (err)
          this.setState({
            show: true
          });
      });
  }


  updateProfiles = () => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, this.state.forecastWeather],
    }));
  }

  // addNewProfile = (profileData) => {
  //   this.setState(prevState => ({
  //     profiles: [...prevState.profiles, profileData],
  //   }));
  // };



  removeProfile = i => {
    this.setState(state => {
      const profiles = state.profiles.filter((profile, j) => i !== j);
      return {
        profiles,
      };
    });
  };


  componentDidMount() {
    const { eventEmitter } = this.props;
    this.updateWeather();
    if (!this.cityName) {
      this.setState({
        isEnabled: false
      });
    }
    eventEmitter.on("updateWeather", (data) => {
      this.setState({ cityName: data }, () => this.updateWeather());
    })
  }
  render() {
    const {loggedIn} = this.state;
    if (loggedIn) {
      return (
        <div className="container-lg-fluid">
          <ContextStore.Provider value={{
            hideModal: this.hideModal,
            toggleLogin: this.toggleLogin,
            updateProfiles: this.updateProfiles,
            removeProfile: this.removeProfile,
            cityName: this.state.cityName,
            isEnabled: this.state.isEnabled,
            profiles: this.state.profiles,
            location: this.state.location,
            temp_c: this.state.temp_c,
            humidity: this.state.humidity,
            text: this.state.text,
            iconCode: this.state.iconCode,
            forecastWeather: this.state.forecastWeather,
            eventEmitter: this.props.eventEmitter

          }}>
          <div className="d-xl-flex flex-xl-row justify-content-center mt-2 p-md-5">
            <UserBar />
            {this.state.show ? <Modal /> : null}
            <MainSection />
            <ProfileSection />
          </div>
          </ContextStore.Provider>
        </div>
        
      );
    }
    return (
      <LoginPage toggleLogin={this.toggleLogin} />
    )
  }
}
