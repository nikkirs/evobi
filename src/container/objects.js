import React, { Component } from "react";
import { connect } from "react-redux";
import { Object_select, Increment } from "../actions/index";
import { bindActionCreators } from "redux";
class Concept extends Component {
  renderlist() {
    //used in carousel
    const a = this.props.obj.map(o => {
      return (
        <div>
          <img
            src={o.path}
            height="200"
            width="200"
            onClick={() => {
              this.props.Object_select({ ...o, id1: this.props.id1 }); //spreading each object and adding id to it
              this.props.Increment(this.props.id1); //incrementing id for next object
            }}
          ></img>
        </div>
      );
    });
    return a;
  }
  renderlist2() {
    //shows selected object images on the gray element
    const a = this.props.objectselect.map(o => {
      return (
        <div>
          <img src={o.path} height="100" width="100"></img>
        </div>
      );
    });
    return a;
  }
  render() {
    return (
      <div>
        <div className="slick-carousel">{this.renderlist()}</div>
        <div id="elements1">{this.renderlist2()}</div>
      </div>
    );
  }
  componentDidMount() {
    $(".slick-carousel").slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true
    });
  }
}
function mapStateToProps(state) {
  return {
    obj: state.themeselect, //contains all the elements
    objectselect: state.objectselect, //elements which are selected
    id1: state.id1 //id for each object
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ Object_select, Increment }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Concept);
