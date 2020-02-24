export default function(state = false, action) {
  switch (action.type) {
    case "CLIK":
      return action.payload;
  }
  return state;
}
