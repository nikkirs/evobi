import React, { Component } from "react";
import { Link } from "react-router"; //used for preview
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { obj_prop_select, Sequence, clik, property } from "../actions/index"; //all the actions
//functions used
//render(called first)->renderlist,properties,preview_screen
//properties->movable,statica,misc
//preview_screen

class Moves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //initially false, when clicked -state is changed to true
      a: false, //used in movable function
      b: false, //used in statica function
      c: false, //used in miscelleneous

      st: {
        color: "red" //flag  to enable overlap
      },
      st1: {
        color: "red" //flag  to enable sound
      },
      st2: {
        color: "red" //flag  to enable keyboard interaction
      },
      st3: {
        color: "red" //flag to enable boomb shooting
      }
    };
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
        <img
          src={o.path}
          height="100"
          width="100"
          onClick={() => {
            this.props.obj_prop_select(o); //3rd option gets open for that particular object
          }}
        ></img>
      );
    });

    return a;
  }

  misc() {
    if (!this.state.c) {
      return;
    }
    return (
      <div>
        <h4 style={this.state.st1}>Sound</h4>
        <button
          onClick={() => {
            this.props.objprop.prop.sound = true;
            this.setState({ st1: { color: "green" } });
          }}
          onBlur={() => {
            this.setState({ st1: { color: "red" } });
          }}
        >
          True
        </button>
        <button
          onClick={() => {
            this.props.objprop.prop.sound = false;
            this.setState({ st1: { color: "red" } });
          }}
        >
          False
        </button>
        <h4 style={this.state.st3}>Bomb Shooting</h4>
        <button
          onClick={() => {
            this.props.objprop.prop.shoot = true; //objprop contains all the properties (property_reducer.js)
            this.setState({ st3: { color: "green" } });
          }}
          onBlur={() => {
            this.setState({ st3: { color: "red" } });
          }}
        >
          True
        </button>
        <button
          onClick={() => {
            this.props.objprop.prop.shoot = false;
            this.setState({ st3: { color: "red" } });
          }}
        >
          False
        </button>
      </div>
    );
  }
  statica() {
    if (!this.state.b) {
      return;
    }
    return (
      <div>
        <h4 style={this.state.st}>Overlap</h4>
        <button
          onClick={() => {
            this.props.objprop.prop.overlap = true;
            this.setState({ st: { color: "green" } });
          }}
          onBlur={() => {
            this.setState({ st: { color: "red" } });
          }}
        >
          True
        </button>
        <button
          onClick={() => {
            this.props.objprop.prop.overlap = false;
            this.setState({ st: { color: "red" } });
          }}
        >
          False
        </button>
      </div>
    );
  }
  movable() {
    if (!this.state.a) {
      return;
    }
    return (
      <div>
        {
          //move
        }
        <h4>
          move
          <input
            type="range"
            name="rangeInput"
            min="0"
            max="1000"
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

              event.target.value = 0; //to reset
            }}
          ></input>
          <input
            type="text"
            id="textInput"
            value="0"
            style={{ width: "60px" }}
          ></input>
          <button>Ok</button>
        </h4>

        {
          //////////
        }

        <h4>
          jump
          <input
            type="range"
            name="rangeInput"
            min="0"
            max="500"
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

              event.target.value = 0;
            }}
          ></input>
          <input
            type="text"
            id="textInput2"
            value="0"
            style={{ width: "60px" }}
          ></input>
          <button>ok</button>
          {
            //---------------
          }
        </h4>
        <h3 style={this.state.st2}>Keyboard Interaction</h3>
        <button
          onClick={() => {
            this.props.objprop.prop.cursor = true;
            this.setState({ st2: { color: "green" } });
          }}
          onBlur={() => {
            this.setState({ st2: { color: "red" } });
          }}
        >
          True
        </button>
        <button
          onClick={() => {
            this.props.objprop.prop.cursor = false;
            this.setState({ st2: { color: "red" } });
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
      <div id="properties">
        <h3
          onClick={() => {
            this.setState({ a: true });
          }}
        >
          Moveable
        </h3>
        {this.movable()}
        <h3
          onClick={() => {
            this.setState({ b: true });
          }}
        >
          static
        </h3>
        {this.statica()}
        <h3
          onClick={() => {
            this.setState({ c: true });
          }}
        >
          Miscellaneous
        </h3>
        {this.misc()}

        <button
          id="submit"
          onClick={() => {
            this.props.clik(true); //ok button to go to main game preview
          }}
        >
          ok
        </button>
      </div>
    );
  }
  preview_screen() {
    if (!this.props.objprop) {
      return;
    } else {
      const a = this.props.objprop.prop.seq.map(o => {
        return (
          <div>
            <div>
              {o.name}--{o.value}
            </div>
            |
          </div>
        );
      });

      return a;
    }
  }
  render() {
    return (
      <div>
        <div id="moves">{this.renderlist()}</div>
        {this.properties()}
        <div id="preview">
          {this.preview_screen()}
          <Link to="/preview" target="_blank">
            Preview
          </Link>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    objprop: state.obj_prop_select,
    object: state.objectselect,
    addprop: state.addprop
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { Sequence, obj_prop_select, clik, property },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Moves);
