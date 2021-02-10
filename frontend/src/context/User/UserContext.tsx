import { createContext } from "react";

const UserContext = createContext<any>({ user: null, token: null, isAuth: false });

export default UserContext;
