import React, { ReactNode, useReducer } from "react";
import * as SecureStore from "expo-secure-store"
import { Post } from "../models/Post";
import api from "../services/api";
import { navigate } from "../RootNavigation";
import { getAuthHeader, getUser } from "../services/auth";

interface PostContext {
    posts: Post[];
    getPosts?: () => void;
    likePost?: ({ postId }: { postId: string }) => void;
    createPost?: (postData) => void;
}

const defaultValue = {
    posts: []
};

const Context = React.createContext<PostContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "show_posts":
                return {
                    ...state,
                    posts: action.payload,
                }
            case "like_post":
                const newPost = state.posts;
                const [postLiked, ..._] = newPost.filter((post) => post.id === action.payload.id)
                postLiked.likes = action.payload.likes;
                return { posts: [...newPost] }
            case "create_post":
                return { posts: [action.payload, ...state.posts] };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, defaultValue)

    const getPosts = async () => {
        try {
            const { data } = await api.get("/post/followings", await getAuthHeader());

            dispatch({ type: "show_posts", payload: data });
        } catch (err: any) {
            alert("Erro ao obter o feed")
        }
    }

    const likePost = async ({ postId }) => {
        try {

            await api.post(`/post/like/${postId}`, null, await getAuthHeader());
            const post: Post = (await api.get(`/post/${postId}`, await getAuthHeader())).data;

            dispatch({
                type: "like_post",
                payload: { id: postId, likes: post.likes },
            })
        } catch (error) { }
    }

    const createPost = async ({ content, image }) => {
        try {
            const auth = await getAuthHeader();
            const token = await SecureStore.getItemAsync("token");

            const formData = new FormData();
            formData.append("content", content)
            formData.append("postFile", image)

            const response = (await api.post("/post", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            })).data;
            const { data } = await api.get(`/post/${response}`, auth);
            console.log(data)

            dispatch({ type: "create_post", payload: { ...data } });

            navigate("PostList");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Context.Provider value={{ ...state, getPosts, likePost, createPost }} >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }