import React from 'react';
import ReactDOM from 'react-dom';
import CurrentWeather from "../components/main/CurrentWeather";
import ForecastWeather from "../components/main/ForecastWeather";

it('renders CurrentWeather component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CurrentWeather />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders ForecastWeather component without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ForecastWeather />, div);
  ReactDOM.unmountComponentAtNode(div);
});
