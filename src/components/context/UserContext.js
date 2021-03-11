import { createContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  username: null,
  toolsCheckedOut: [],
});
