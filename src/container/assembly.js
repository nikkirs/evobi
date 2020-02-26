//import libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { camera_position } from "../actions/index";
import { bindActionCreators } from "redux";
import interact from "interactjs";

class Assembly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0
    };
  }

  renderlist() {
    const position = { x: this.state.x, y: this.state.y }; //common variable to assign position to each object
    var w = 50,
      h = 50;
    interact(".draggable")
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        inertia: true
      })
      .draggable({
        onmove: window.dragMoveListener,
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: (0, 0, document.getElementById("canvas1")), //for restricting the draggable and drop zone
            endOnly: true
          })
        ],
        listeners: {
          move(event) {
            position.x += event.dx;
            position.y += event.dy;
            event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
          }
        }
      })
      .on("resizemove", function(event) {
        var target = event.target;
        var x = parseFloat(target.getAttribute("data-x")) || 0;
        var y = parseFloat(target.getAttribute("data-y")) || 0;

        // update the element's style
        target.style.width = event.rect.width + "px";
        target.style.height = event.rect.height + "px";

        w = event.rect.width;
        h = event.rect.height;

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
          "translate(" + x + "px," + y + "px)";

        target.setAttribute("data-x", x);
        target.setAttribute("data-y", y);
        target.textContent =
          Math.round(event.rect.width) +
          "\u00D7" +
          Math.round(event.rect.height);
      });

    interact("#canvas1")
      .dropzone({
        ondrop: function() {}
      })
      .on("dropactivate", function(event) {
        event.target.classList.add("drop-activated");
      });
    const a = this.props.objectselect.map(o => {
      return (
        <li>
          <img
            src={o.path}
            height="100"
            width="100"
            className="draggable"
            id={"id_" + o.id1.toString()}
            onMouseUp={() => {
              (o.x = position.x),
                (o.y = position.y + o.id1 * 50), //50 is added to position as this is the height of image
                (o.w = w),
                (o.h = h);
              console.log(o.y);
            }}
          ></img>
        </li>
      );
    });

    return a;
  }

  render() {
    const position = { x: this.state.x, y: this.state.y }; //common variable to assign position to each object
    interact(".draggable1")
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        inertia: true
      })
      .draggable({
        onmove: window.dragMoveListener,
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: (0, 0, document.getElementById("canvas1")), //for restricting the draggable and drop zone
            endOnly: true
          })
        ],
        listeners: {
          move(event) {
            position.x += event.dx;
            position.y += event.dy;
            event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
          }
        }
      });
    return (
      <div>
        <div id="elements">
          <ul style={{ listStyle: "none" }}>{this.renderlist()}</ul>
          <button
            id="ok"
            onClick={() => {
              this.setState({ x: 0, y: 0 }); //to reset the position for the next object to zero.Needs to be reset or else relative position is wrong
            }}
          >
            ok
          </button>
        </div>

        <div
          id="canvas1"
          style={{
            backgroundColor: "yellow",
            zIndex: "-1",
            position: "absolute",
            top: "90px",
            left: "300px",
            width: "900px",
            height: "505px"
          }}
        >
          <div
            id="cameradiv"
            className="draggable1"
            onMouseUp={() => {
              this.props.camera_position({ x: position.x, y: position.y });
            }}
          ></div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    objectselect: state.objectselect
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ camera_position }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Assembly);
