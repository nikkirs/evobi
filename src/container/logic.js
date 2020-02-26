import React, { Component } from "react";
import { Link } from "react-router"; //used for preview
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { obj_prop_select } from "../actions/index"; //all the actions
//functions used
//render(called first)->renderlist,properties,preview_screen
//properties->movable,statica,misc
//preview_screen

class Moves extends Component {
  constructor(props) {
    super(props);
  }
  updateTextInput(val) {
    document.getElementById("textInput").value = val; //to update input box for move
  }
  updateTextInput1(val) {
    document.getElementById("textInput2").value = val; //to update input box for jump
  }
  renderlist() {
    const a = this.props.object.map(o => {
      return (
        <div className="card">
          <img
            src={o.path}
            height="100"
            width="100"
            onClick={() => {
              this.props.obj_prop_select(o); //3rd option gets open for that particular object
            }}
          ></img>
        </div>
      );
    });

    return a;
  }

  misc() {
    return (
      <div>
        <h4>Sound</h4>
        <button
          type="button"
          class="btn btn-success"
          style={{ marginRight: "20px" }}
          onClick={() => {
            this.props.objprop.prop.sound = true;
          }}
        >
          True
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            this.props.objprop.prop.sound = false;
          }}
        >
          False
        </button>
        <h4>Bomb Shooting</h4>
        <button
          type="button"
          class="btn btn-success"
          style={{ marginRight: "20px" }}
          onClick={() => {
            this.props.objprop.prop.shoot = true; //objprop contains all the properties (property_reducer.js)
          }}
        >
          True
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            this.props.objprop.prop.shoot = false;
          }}
        >
          False
        </button>
      </div>
    );
  }
  statica() {
    return (
      <div>
        <h4>Overlap</h4>
        <button
          type="button"
          class="btn btn-success"
          style={{ marginRight: "20px" }}
          onClick={() => {
            this.props.objprop.prop.overlap = true;
          }}
        >
          True
        </button>
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            this.props.objprop.prop.overlap = false;
          }}
        >
          False
        </button>
      </div>
    );
  }
  movable() {
    return (
      <div>
        <h4>Sequence</h4>
        <h4 style={{ marginRight: "20px" }}>
          move
          <input
            type="range"
            name="rangeInput"
            min="0"
            max="1000"
            style={{ marginRight: "5px" }}
            onChange={event => {
              this.updateTextInput(event.target.value);
            }}
            onBlur={event => {
              //add move and jump with its value to sequence array
              this.props.objprop.prop.seq = this.props.objprop.prop.seq.concat({
                name: "move",
                value: event.target.value
              });

              //used for preview
              localStorage.setItem("obj", JSON.stringify(this.props.objprop)); //to store player properties in local storage
              this.setState({});
              event.target.value = 0; //to reset
            }}
          ></input>
          <input
            type="text"
            id="textInput"
            value="0"
            style={{ marginRight: "5px", width: "60px" }}
          ></input>
          <button
            type="submit"
            class="btn btn-primary mb-2"
            style={{ marginRight: "5px" }}
          >
            Submit
          </button>
        </h4>

        {
          //////////
        }

        <h4 style={{ marginRight: "20px" }}>
          jump
          <input
            type="range"
            name="rangeInput"
            min="0"
            max="500"
            style={{ marginRight: "5px" }}
            onChange={event => {
              this.updateTextInput1(event.target.value);
            }}
            onBlur={event => {
              //add move and jump with its value to sequence array
              this.props.objprop.prop.seq = this.props.objprop.prop.seq.concat({
                name: "jump",
                value: event.target.value
              });
              //used for preview
              localStorage.setItem("obj", JSON.stringify(this.props.objprop)); //to store player properties in local storage
              this.setState({});

              event.target.value = 0;
            }}
          ></input>
          <input
            type="text"
            id="textInput2"
            value="0"
            style={{ marginRight: "5px", width: "60px" }}
          ></input>
          <button
            type="submit"
            class="btn btn-primary mb-2"
            style={{ marginRight: "5px" }}
          >
            Submit
          </button>{" "}
          {
            //---------------
          }
        </h4>
        <h4>Keyboard Interaction</h4>
        <button
          type="button"
          className="btn btn-success"
          style={{ marginRight: "20px" }}
          onClick={() => {
            this.props.objprop.prop.cursor = true;
          }}
        >
          True
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            this.props.objprop.prop.cursor = false;
          }}
        >
          False
        </button>
      </div>
    );
  }
  properties() {
    if (!this.props.objprop) {
      return;
    }
    return (
      <div>
        <div id="movable">
          <h3>Movable</h3>
          {this.movable()}
        </div>
        <div id="static">
          <h3>Static</h3>
          {this.statica()}
        </div>
        <div id="misc">
          <h3>Miscelleneous</h3>
          {this.misc()}
        </div>
      </div>
    );
  }
  preview_screen() {
    if (!this.props.objprop) {
      return;
    } else {
      const a = this.props.objprop.prop.seq.map(o => {
        return (
          <div id="preview_values">
            <div style={{ marginTop: "20px", marginLeft: "10px" }}>
              {o.name}--{o.value}
            </div>
          </div>
        );
      });

      return a;
    }
  }
  render() {
    return (
      <div>
        <div id="moves" className="scrolling-wrapper scrollbar">
          {this.renderlist()}
        </div>
        <div id="properties">{this.properties()}</div>
        <div id="preview">{this.preview_screen()}</div>

        <Link
          to="/preview"
          target="_blank"
          id="preview_link"
          type="button"
          className="btn btn-success"
        >
          Preview
        </Link>
        <Link
          to="/game"
          target="_blank"
          id="game_link"
          type="button"
          className="btn btn-success"
          onClick={() => {
            localStorage.setItem("obj", JSON.stringify(this.props.object));
            localStorage.setItem("cam", JSON.stringify(this.props.camera_pos));
          }}
        >
          Play
        </Link>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    objprop: state.obj_prop_select,
    object: state.objectselect,
    camera_pos: state.camera_pos
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ obj_prop_select }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Moves);
