import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Home from "./pages/Home";
import Modal from "./components/main/Modal";
import Login from "./components/Loginpage/Login";
import Register from "./components/Loginpage/Register"
import axios from "axios";
import ContextStore from "./ContexStore";
import { Route, Switch, Redirect, BrowserRouter} from "react-router-dom";

const WEATHER_KEY = "ed4c130b02024734906162a48dc7aaee";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Rzeszow",
      numForecastDays: 4,
      show: false,
      isEnabled: true,
      profiles: []
    }
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
        text: currentWeatherData.data.data[0].weather.description,
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

  removeProfile = (i) => {
    this.setState(state => {
      const profiles = state.profiles.filter((profile, j) => i !== j);
      return {
        profiles,
      };
    });
  };
  setRedirect = () => {
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }));
  }
  succesfullLogin = () => {
    if (this.state.loggedIn) {
      return <Redirect to='/home' />
    }
  }
  logOut = () =>{
    if (!this.state.loggedIn) {
      return <Redirect to='/' />
    }
  }


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
      return (
        <div className="container-lg-fluid">
          <ContextStore.Provider value={{
            ...this.state,
            hideModal: this.hideModal,
            toggleLogin: this.toggleLogin,
            updateProfiles: this.updateProfiles,
            removeProfile: this.removeProfile,
            eventEmitter: this.props.eventEmitter,
            succesfullLogin: this.succesfullLogin,
            setRedirect: this.setRedirect,
            logOut: this.logOut
          }}>
            {this.state.show ? <Modal /> : null}
            <BrowserRouter
            basename="/login">
            <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            { this.state.loggedIn && 
            <Route exact path="/home" component={Home} />
            }
            </Switch>
            </BrowserRouter>
          </ContextStore.Provider>
        </div>
        
      );
    }
  }
