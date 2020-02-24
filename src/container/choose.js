import React, { Component } from "react";
import { connect } from "react-redux";
import { Select_btn } from "../actions/index"; //action to send what is selected 1 or 2 or 3 option  to reducer
import { bindActionCreators } from "redux";
class Choose extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="buttons">
        <button
          className="choosebtn"
          onClick={event => {
            this.props.Select_btn(event.target.value);
          }}
          value="one"
        >
          OBJECTS
        </button>
        <button
          className="choosebtn"
          onClick={event => {
            this.props.Select_btn(event.target.value);
          }}
          value="two"
        >
          ASSEMBLY
        </button>
        <button
          className="choosebtn"
          onClick={event => {
            this.props.Select_btn(event.target.value);
          }}
          value="three"
        >
          LOGIC
        </button>
      </div>
    );
  }
}
//no mappropstostate because nothing has to be taken from reducer
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ Select_btn: Select_btn }, dispatch);
}
export default connect(
  null,
  mapDispatchToProps
)(Choose);
