import React, { useReducer } from "react";
import {
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
} from "./type";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import axios from "axios";

interface LoginInterface {
  email: string;
  password: string;
}
interface RegisterInterface {
  name: string;
  email: string;
  phone_no: string;
  address: string;
  standard: string;
  password: string;
}
const UserState = (props: any) => {
  const initialState = {
    token: null,
    user: null,
    isAuth: false,
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const login = async (formData: LoginInterface) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/user/login",
        headers: {},
        data: {
          email: formData.email,
          password: formData.password,
        },
      });
      console.log(response);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
  const register = async (formData: RegisterInterface) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/register",
        formData
      );
      dispatch({
        type: REGISTER_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: REGISTER_FAIL,
        payload: e.response.data.msg,
      });
    }
  };
  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "get",
        url: "http://localhost:3000/getUser",
        headers: {
          authorization: "Bearer " + token,
        },
      });
      console.log(res);
      const data = { user: res.data };
      dispatch({
        type: USER_LOADED,
        payload: data,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
  return (
    <UserContext.Provider
      value={{
        token: state.token,
        user: state.user,
        isAuth: state.isAuth,
        login,
        loadUser,
        register,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
