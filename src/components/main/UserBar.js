import React from 'react';
import ContextStore from "../../ContexStore"
export default class userBar extends React.Component {
  static contextType = ContextStore;
  render() {
    return (
      <div className="userbar m-2">
        <span className="font-weight-bold mr-2 text-secondary col">Logged as <span className="text-primary">admin</span></span>
        <button type="submit" onClick={this.context.toggleLogin} className="btn btn-primary mb-2">Log out</button>
      </div>)
  }
}
