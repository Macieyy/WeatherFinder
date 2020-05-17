import React from 'react';
import ContextStore from "../../ContexStore"


export default class UserBar extends React.Component {
  static contextType = ContextStore;

  render() {
    return (
      <div className="userbar m-2">
        {this.context.logOut()}
        <span className="font-weight-bold mr-2 text-secondary col">Logged as <span className="text-primary">admin</span></span>
        <button type="submit" onClick={this.context.setRedirect} className="btn btn-primary mb-2 log_out_button">Log out</button>
      </div>)
  }
}
