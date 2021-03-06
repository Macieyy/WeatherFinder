import React from "react";
import ProfileWeather from "./ProfileWeather";
import ContextStore from "../../../ContexStore";
/**
 * Komponent profilu. Wewntątrz komponentu mapowane są wartości przypisane do zmiennej {profile} i obrazowane za pomocą komponentu ProfileWeather
 * @component
 */
class ProfileSection extends React.Component {
  static contextType = ContextStore;

  render() {
    return (
      <div className="col-xl-4 col-12 p-3 profile">
        <nav className="navbar sticky-top border border-white ">
          <a className="navbar-brand text-white" href="/#">
            Profile
          </a>
        </nav>
        <div className="overflow-auto scrollbar-light-blue profile-section">
          {this.context.profiles.map((profile, index) => (
            <ProfileWeather key={index} {...profile} index={index} />
          ))}
        </div>
      </div>
    );
  }
}
export default ProfileSection;
