export default function(state = "one", action) {
  switch (action.type) {
    case "BTN_SELECTED":
      return action.payload;
  }
  return state;
}
