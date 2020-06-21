import React from "react";
import App from "../App";
import Modal from "../components/main/Modal";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("should update state.profiles upon updateProfiles() function call", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state().profiles.length).toEqual(0);
  wrapper.setState({
    forecastWeather: { city: "Rzeszow", temp: "16", humidity: "60" },
  });
  wrapper.instance().updateProfiles();
  expect(wrapper.state().profiles.length).toEqual(1);
});

it("should render modal component if state.show is true", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.state().show).toBe(false);
  wrapper.setState({ show: true });
  expect(wrapper.state().show).toBe(true);
  expect(wrapper.find(Modal).length).toEqual;
});
