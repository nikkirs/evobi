export default function(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return action.payload;
  }
  return state;
}
