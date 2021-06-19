import { useReducer } from "react";
import {
  LOGIN_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./type";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import axios from "axios";
const { REACT_APP_NODEJS_URL } = process.env;
interface LoginInterface {
  email: string;
  password: string;
}
interface ForgetPasswordInterface {
  email: string;
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
    isError:null,
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const login = async (formData: LoginInterface) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://${REACT_APP_NODEJS_URL}/user/login`,
        headers: {},
        data: {
          email: formData.email,
          password: formData.password,
        },
      });
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: LOGIN_FAIL,
      });
      throw 401;
    }
  };
  const register = async (formData: RegisterInterface) => {
    console.log(formData);
    try {
      await axios.post(
        `http://${REACT_APP_NODEJS_URL}/user/signup`,
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
      throw 400;
    }
  };
  const logout = async () => {
    dispatch({
      type:LOGOUT,
    })
  }
  const forgetPassword = async (formData : ForgetPasswordInterface) =>
  {
    console.log("Forget Password")
  }
  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "get",
        url: `http://${REACT_APP_NODEJS_URL}/getUser`,
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
        isError:state.isError,
        login,
        logout,
        loadUser,
        register,
        forgetPassword
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
