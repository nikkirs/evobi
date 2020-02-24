import { combineReducers } from "redux";
import Btn from "./btnname_reducer";
import Themeselect from "./theme_reducer";
import Objectselect from "./object_reducer";
import Increment from "./increment";
import clik from "./clik_reducer";
import obj_prop_sel from "./object_prop_reducer";

import camera_pos from "./camera_position";
const rootReducer = combineReducers({
  id1: Increment,
  btnname: Btn,
  themeselect: Themeselect,
  objectselect: Objectselect,
  clik: clik,
  obj_prop_select: obj_prop_sel,

  camera_pos: camera_pos
});

export default rootReducer;
