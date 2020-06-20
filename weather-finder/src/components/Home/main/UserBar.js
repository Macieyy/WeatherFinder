import React from 'react';
import ContextStore from "../../../ContexStore"


export default class UserBar extends React.Component {
  static contextType = ContextStore;

  render() {
    return (
      <div className="userbar m-2">
        <span className="font-weight-bold mr-2 text-secondary col">Logged as <span className="text-primary">{this.props.user}</span></span>
        <button type="submit" onClick={this.props.logOut} className="btn btn-primary mb-2 log_out_button">Log out</button>
      </div>)
  }
}
