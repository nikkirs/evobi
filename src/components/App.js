import React from "react";

import Player from "./player";
import Choose from "../container/choose";
import { connect } from "react-redux";
import Concept from "../container/objects";
import Assembly from "../container/assembly";
import Moves from "../container/logic";
class App extends React.Component {
  render() {
    //clik is a variable in a clik_reducer to move to preview window
    // it is true  when ok button is pressed

    if (this.props.btnname == "one") {
      return (
        <div>
          <Choose />
          <Concept />
        </div>
      );
    } else if (this.props.btnname == "two") {
      return (
        <div>
          <Choose />
          <Assembly />
        </div>
      );
    } else if (this.props.btnname == "three") {
      return (
        <div>
          <Choose />
          <Moves />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    btnname: state.btnname
  };
}

export default connect(mapStateToProps)(App);
