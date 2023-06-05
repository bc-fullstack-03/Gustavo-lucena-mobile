import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";
import { style } from "./style";
import { Spacer } from "../Spacer";
import { Chat, Heart, UserCircle } from "phosphor-react-native";
import { Post } from "../../models/Post";

interface PostItemProps {
    post: Post;
}

export function PostItem({ post }: PostItemProps) {
    const { userId } = useContext(AuthContext);
    const { likePost } = useContext(PostContext);

    function handleLike() {
        likePost({ postId: post.id })
    }

    return (
        <View style={style.container}>
            <View style={style.heading} >
                <UserCircle color="white" size={48} weight="thin" />
                <Text style={style.profileName} >{post.userEmail}</Text>
            </View>
            <Spacer>
                <Text style={style.postContent} >{post.content}</Text>
                <Spacer />
                {
                    post.fileUrl && (
                        <Image source={{ uri: post.fileUrl }} style={style.image} ></Image>
                    )
                }
            </Spacer>
            <View style={style.footer} >
                <Chat size={24} color="white" weight="thin" />
                <Text style={style.number} >{post.comments.length}</Text>
                <TouchableOpacity onPress={handleLike}>
                    {
                        !post.likes.includes(userId) ? 
                        (<Heart size={24} color="white" weight="thin" />) :
                        (<Heart size={24} color="red" weight="fill" />)
                    }
                    
                </TouchableOpacity>
                <Text style={style.number} >{post.likes.length}</Text>
            </View>
        </View>
    );
}