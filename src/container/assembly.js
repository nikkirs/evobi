//import libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { clik, camera_position } from "../actions/index";
import { bindActionCreators } from "redux";
import interact from "interactjs";

var pos = [];
var flag = 0;
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
                (o.y = position.y + o.id1 * 50),
                (o.w = w),
                (o.h = h);
            }}
          ></img>
        </li>
      );
    });

    return a;
  }
  zoom = (deltaY, e, img, idiv, pos) => {
    var newWidth, newHeight;
    // var e1,f1,flag1;
    var currenWidth = idiv.style.width;
    var currenHeight = idiv.style.height;
    var newWidth1, newHeight1;
    var l = parseInt(idiv.style.left);
    var t = parseInt(idiv.style.top);

    var a, b;

    if ((parseInt(currenHeight) <= 600) & (parseInt(currenWidth) <= 900)) {
      if (deltaY < 0) {
        ////Mouse Down
        if (parseInt(currenWidth)) {
          // e1=parseInt(currenWidth);
          newWidth = parseInt(currenWidth) - 2;
          // f1=parseInt(currenHeight);
          newHeight = parseInt(currenHeight) - 2;

          l = l + 1;
          t = t + 1;
        }
      } else if (deltaY > 0) {
        //Mouse Up
        if ((parseInt(currenHeight) != 600) & (parseInt(currenWidth) != 900)) {
          newWidth = parseInt(currenWidth) + 2;
          newHeight = parseInt(currenHeight) + 2;
          l = l - 1;
          t = t - 1;
        }
      }
    }
    newWidth1 = (1 / 9) * newWidth;
    newHeight1 = (1 / 6) * newHeight;

    for (var i = 0; i < img.length; i++) {
      //a = 1 + (pos[i].left / 900) * newWidth;
      //b = 1 + (pos[i].top / 600) * newHeight;
      console.log(img[i].style);

      img[i].style.left = 0 - 1 + "px";
      img[i].style.top = 0 - 1 + "px";
    }

    idiv.style.left = l + "px";
    idiv.style.top = t + "px";
    idiv.style.width = newWidth + "px";
    idiv.style.height = newHeight + "px";

    for (var i = 0; i < img.length; i++) {
      img[i].style.width = newWidth1 + "px";
      img[i].style.height = newHeight1 + "px";
    }
  };

  wheel = e => {
    var img = [];

    for (var i = 0; i < this.props.objectselect.length; i++) {
      img[i] = document.getElementById("id_" + i.toString());
    }
    if (flag == 0) {
      for (var i = 0; i < this.props.objectselect.length; i++) {
        // console.log(this.props.objectselect[i].y);
        pos[i] = {
          top: 80,
          left: 220
          //top: parseInt(this.props.objectselect[i].y),
          //left: parseInt(this.props.objectselect[i].x)
        };
        console.log(pos[i]);
      }
      flag = 1;
    }

    var idiv = document.getElementById("canvas1");

    const { deltaY } = e;

    this.zoom(deltaY, e, img, idiv, pos);
    return false;
  };
  grids() {
    var ar = [];
    for (var i = 0; i < 15; i++) {
      for (var j = 0; j < 8; j++) {
        ar = ar.concat(<div className="grids"></div>);
      }
    }
    return ar;
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
      <div onWheel={this.wheel}>
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
        <div style={{ position: "absolute", top: "230px", left: "270px" }}>
          {" "}
          <div style={{ marginBottom: "90px" }}>120</div>
          <div style={{ marginBottom: "90px" }}>240</div>
          <div style={{ marginBottom: "90px" }}>360</div>
          <div style={{ marginBottom: "90px" }}>480</div>
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
          <span style={{ marginRight: "90px" }}>0</span>
          <span style={{ marginRight: "90px" }}>120</span>
          <span style={{ marginRight: "90px" }}>240</span>
          <span style={{ marginRight: "100px" }}>360</span>
          <span style={{ marginRight: "100px" }}>480</span>
          <span style={{ marginRight: "100px" }}>600</span>
          <span style={{ marginRight: "100px" }}>720</span>
          <span style={{ marginRight: "100px" }}>840</span>
          <div
            id="cameradiv"
            className="draggable1"
            onMouseUp={() => {
              this.props.camera_position({ x: position.x, y: position.y });
            }}
          ></div>
          {this.grids()}
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
  return bindActionCreators({ clik, camera_position }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Assembly);
