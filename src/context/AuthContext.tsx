import React, { ReactNode, useReducer } from "react";
import { Auth } from "../models/Auth";
import * as SecureStore from "expo-secure-store"
import api from "../services/api";
import { getAuthHeader } from "../services/auth"

interface AuthContext {
    token: string;
    user: string;
    profile: string;
    errorMessage: string;
    isLoading: boolean;
    login?: () => void;
    tryLocalLogin?: () =>  void;
    register?: () => void;
}

const defaultValue = {
    token: "",
    user: "",
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
                return{...state, errorMessage: "", ...action.payload}
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, defaultValue)

    const login = async (auth: Auth) => {
        try {
            const { token } = (await api.post("/auth/authenticate", auth)).data;
            await SecureStore.setItemAsync("token", token);
            
            const { email, name } = (await api.get("/auth/get-logged", await getAuthHeader())).data
            await SecureStore.setItemAsync("user", name);
            await SecureStore.setItemAsync("profile", email);

            dispatch({
                type: "login",
                payload: { token: token, profile: email, user: name, isLoading: false, }
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: "add_error",
                payload: "Houve um erro no login.",
            })
        }
    }

    const tryLocalLogin =async () => {
        try {
            const token = await SecureStore.getItemAsync("token");
            const user = await SecureStore.getItemAsync("user");
            const profile = await SecureStore.getItemAsync("profile");

            dispatch({
                type: "login",
                payload: { token: token, profile: profile, user: user, isLoading: false, }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const register = async(auth: Auth) => {
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

    return (
        <Context.Provider value={{ ...state, login, tryLocalLogin, register }} >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }