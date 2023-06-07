import React, { ReactNode, useReducer } from "react";
import * as SecureStore from "expo-secure-store"
import { Post } from "../models/Post";
import api from "../services/api";
import { navigate } from "../RootNavigation";
import { getAuthHeader } from "../services/auth";
import { Comment } from "../models/Comment";

interface PostContext {
    posts: Post[];
    comments: Comment[];
    getPosts?: () => void;
    getComments?: (postId: string) => void;
    likePost?: ({ postId }: { postId: string }) => void;
    createPost?: (postData) => void;
    createComment?: (comment: string, id: string) => void;
}

const defaultValue = {
    posts: [],
    comments: [],
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
            case "show_comments":
                return {
                    ...state,
                    comments: action.payload,
                }
            case "like_post":
                const newPost = state.posts;
                const [postLiked, ..._] = newPost.filter((post) => post.id === action.payload.id)
                postLiked.likes = action.payload.likes;
                return { posts: [...newPost] }
            case "create_post":
                return { posts: [action.payload, ...state.posts] };
            case "create_comment":
                return { comments: [action.payload, ...state.comments] };
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

            dispatch({ type: "create_post", payload: { ...data } });

            navigate("PostList");
        } catch (error) {
            console.log(error)
        }
    }

    const getComments = async (postId) => {
        try {
            const { data } = await api.get(`/comment/${postId}`, await getAuthHeader());

            dispatch({ type: "show_comments", payload: data });
        } catch (err: any) {
            alert("Erro ao obter os comentários")
        }
    }

    const createComment = async (content: string, postId: string) => {
        const token = await SecureStore.getItemAsync("token");
        const formData = new FormData();
        formData.append("content", content)

        try {
            const { data } = await api.post(`/comment/${postId}`, content, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            dispatch({ type: "create_comment", payload: { ...data } });
        } catch (error) {
            alert("Erro ao tentar salvar comentário")

            if (error.response) {
                // Erro de resposta do servidor (status de erro, etc.)
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            } else if (error.request) {
                // A solicitação foi feita, mas não recebeu resposta
                console.error(error.request);
            } else {
                // Ocorreu um erro ao configurar a solicitação
                console.error('Erro', error.message);
            }
            console.error(error.config);
        }
    }

    return (
        <Context.Provider value={{ ...state, getPosts, likePost, createPost, createComment, getComments }} >
            {children}
        </Context.Provider>
    )
}

export { Provider, Context }