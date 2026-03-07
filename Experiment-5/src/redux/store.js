import { configureStore } from "@reduxjs/toolkit";
import skillReducer from "./slices/skillSlice";

export const store = configureStore({
  reducer: {
    skills: skillReducer
  }
});