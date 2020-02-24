export default function(state = [], action) {
  switch (action.type) {
    case "OBJECT_SELECTED":
      return [...state.concat(action.payload)];
  }
  return state;
}
