
import { useReducer } from "react";
import { appReducer, initialState } from "../reducer/appReducer";
import { AppContext } from "./AppContextOnly";

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
