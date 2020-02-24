export default function(state = null, action) {
  switch (action.type) {
    case "OBJ_PROP":
      return action.payload;
  }
  return state;
}
