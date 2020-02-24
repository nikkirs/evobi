export default function(
  state = {
    x: 0,
    y: 0
  },
  action
) {
  switch (action.type) {
    case "CAMERA_POS":
      return action.payload;
  }
  return state;
}
