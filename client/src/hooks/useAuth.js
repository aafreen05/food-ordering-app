// hooks/useAuth.js
// A small convenience hook so components don't need to import useContext + AuthContext every time.

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => useContext(AuthContext);