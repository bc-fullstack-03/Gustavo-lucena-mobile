import React, { ReactNode, useReducer } from "react";
import { Auth } from "../models/Auth";
import * as SecureStore from "expo-secure-store"
import api from "../services/api";
import { getAuthHeader } from "../services/auth"

interface AuthContext {
    token: string;
    user: string;
    userId: string;
    profile: string;
    errorMessage: string;
    isLoading: boolean;
    login?: () => void;
    tryLocalLogin?: () => void;
    register?: () => void;
    logout?: () => void;
}

const defaultValue = {
    token: "",
    user: "",
    userId: "",
    profile: "",
    errorMessage: "",
    isLoading: true,
};

const Context = React.createContext<AuthContext>(defaultValue)

const Provider = ({ children }: { children: ReactNode }) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "login":
                return {
                    ...state,
                    ...action.payload,
                    errorMessage: "",
                };
            case "add_error":
                return {
                    ...state,
                    errorMessage: action.payload,
                    isLoading: false,
                };
            case "use_created":
                return { ...state, errorMessage: "", ...action.payload }
            case "logout":
                return { token: "", user: "", profile: "", errorMessage: "", isLoading: false }
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, defaultValue)

    const login = async (auth: Auth) => {
        try {
            const { token } = (await api.post("/auth/authenticate", auth)).data;
            await SecureStore.setItemAsync("token", token);

            const { email, name, id } = (await api.get("/auth/get-logged", await getAuthHeader())).data
            await SecureStore.setItemAsync("user", name);
            await SecureStore.setItemAsync("userId", id);
            await SecureStore.setItemAsync("profile", email);

            dispatch({
                type: "login",
                payload: { token: token, profile: email, user: name, userId: id, isLoading: false, }
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: "add_error",
                payload: "Houve um erro no login.",
            })
        }
    }

    const tryLocalLogin = async () => {
        try {
            const token = await SecureStore.getItemAsync("token");
            const user = await SecureStore.getItemAsync("user");
            const userId = await SecureStore.getItemAsync("userId");
            const profile = await SecureStore.getItemAsync("profile");

            dispatch({
                type: "login",
                payload: { token: token, profile: profile, user: user, userId: userId, isLoading: false, }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const register = async (auth: Auth) => {
        try {
            await api.post("/auth/register", auth);
            dispatch({
                type: "user_created",
                isLoading: false,
            })
        } catch (error) {
            dispatch({
                type: "add_error",
                payload: "Houve um erro no cadastro.",
            })
        }
    }

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync("token");
            await SecureStore.deleteItemAsync("user");
            await SecureStore.deleteItemAsync("profile");

            dispatch({
                type: "logout"
            });
        } catch (error) {

        }
    }

    return (
        <Context.Provider value={{ ...state, login, tryLocalLogin, register, logout }} >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }