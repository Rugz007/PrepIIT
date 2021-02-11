import React, { useReducer } from "react";
import {
    LOGIN_FAIL,
    AUTH_ERROR,
    LOGIN_SUCCESS
} from "./type";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import axios from 'axios';

interface LoginInterface {
    email: string;
    password: string;
}
interface RegisterInterface
{
    name:string,
    email:string,
    phone_no:string,
    address:string,
    class:string,
    password:string,
}
const UserState = (props: any) => {
    const initialState = {
        token: null,
        user: null,
        isAuth: false,
    };
    const [state, dispatch] = useReducer(UserReducer, initialState);
    const login = (formData: LoginInterface) => {
        try {
            axios({
                method: 'post',
                url: 'http://localhost:3000/user/login',
                headers: {},
                data: {
                    email: formData.email,
                    password: formData.password,
                }
            }).then((response) => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response,
                })
            })
        }
        catch (e) {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    }
    const register = () =>
    {

    }
    const loadUser = () =>
    {

    }
    return (
        <UserContext.Provider
            value={{
                token: state.token,
                user: state.user,
                isAuth: state.isAuth,
                login,
                loadUser,
                register
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};

export default UserState;
