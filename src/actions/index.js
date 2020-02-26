export function Select_btn(btn) {
  //action to save user selection of concept,assembly,logic
  return {
    type: "BTN_SELECTED",
    payload: btn
  };
}

export function Object_select(object) {
  //action to select objects and store in an array
  return {
    type: "OBJECT_SELECTED",
    payload: object
  };
}
export function Increment(inc) {
  //action to increment id for the next object
  return {
    type: "INCREMENT",
    payload: ++inc
  };
}

export function obj_prop_select(obj) {
  //to get corresponding properties of the objects selected in logic window
  return {
    type: "OBJ_PROP",
    payload: obj
  };
}

export function camera_position(o) {
  //action to store camera position given by user in assembly window
  //stores x and y value
  return {
    type: "CAMERA_POS",
    payload: o
  };
}
