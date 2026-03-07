import { createSlice } from "@reduxjs/toolkit";

const skillSlice = createSlice({
  name: "skills",
  initialState: {
    skills: [
      { id: 1, name: "React" },
      { id: 2, name: "JavaScript" },
      { id: 3, name: "CSS" }
    ]
  },
  reducers: {
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter((skill) => skill.id !== action.payload);
    },
    clearSkills: (state) => {
      state.skills = [];
    }
  }
});

export const { addSkill, removeSkill, clearSkills } = skillSlice.actions;
export default skillSlice.reducer;
