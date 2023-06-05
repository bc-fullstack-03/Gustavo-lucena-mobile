import React, { ReactNode, useReducer } from "react";
import { Post } from "../models/Post";
import api from "../services/api";
import { getAuthHeader, getUserId } from "../services/auth";

interface PostContext {
    posts: Post[];
    getPosts?: () => void;
    likePost?: ({ postId }: { postId: string }) => void;
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
            const post : Post = (await api.get(`/post/${postId}`, await getAuthHeader())).data;

            dispatch({
                type: "like_post",
                payload: { id: postId, likes: post.likes },
            })
        } catch (error) {

        }

    }

    return (
        <Context.Provider value={{ ...state, getPosts, likePost }} >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }