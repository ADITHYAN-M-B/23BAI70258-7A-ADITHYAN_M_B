export const initialState = {
  theme: "light",
  skills: [
    { id: 1, name: "React" },
    { id: 2, name: "JavaScript" },
    { id: 3, name: "CSS" }
  ]
};

export function appReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light"
      };

    case "ADD_SKILL":
      return {
        ...state,
        skills: [...state.skills, action.payload]
      };

    case "REMOVE_SKILL":
      return {
        ...state,
        skills: state.skills.filter(
          skill => skill.id !== action.payload
        )
      };


    default:
      return state;
  }
}
