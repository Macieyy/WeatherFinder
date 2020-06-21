import React from "react";
import { EventEmitter } from "events";

/**
 * Component tworzący EventEmitter
 * @component
 */
class Store extends React.Component {
  constructor(props) {
    super(props);

    this.eventEmitter = new EventEmitter();
    /** Utworzenie stanów początkowych */
    this.state = {
      appName: "Weather Finder",
    };
  }
  render() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        ...this.state,
        eventEmitter: this.eventEmitter,
      });
    });
  }
}
export default Store;
