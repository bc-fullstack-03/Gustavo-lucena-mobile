import { Heart, UserCircle } from "phosphor-react-native";
import { Image, Text, TouchableOpacity, View, FlatList, SafeAreaView } from "react-native";
import { style } from "./style";
import { Spacer } from "../../components/Spacer";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";
import { useContext, useEffect } from "react";
import { Post } from "../../models/Post";
import { CreateComment } from "../../components/CreateComment";
import { CommentDetails } from "../../components/CommentDetails";

export function PostDetails({ route }) {
    const { id, post } = route.params;
    const { likePost, posts, getComments, comments } = useContext(PostContext);
    const { userId } = useContext(AuthContext);

    //const post: Post = posts.find(p => id === p.id);

    function handleLike(id: string) {
        likePost({ postId: id })
    }

    useEffect(() => {
        getComments(id);
    }, [])

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
                <TouchableOpacity onPress={() => handleLike(post.id)}>
                    {
                        post.likes && !post.likes.includes(userId) ?
                            (<Heart size={24} color="white" weight="thin" />) :
                            (<Heart size={24} color="red" weight="fill" />)
                    }
                </TouchableOpacity>
                <Text style={style.number} >{post.likes.length}</Text>
            </View>
            <CreateComment postId={id} />
            <FlatList
                data={comments}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    <CommentDetails comment={item} />
                )}
            >
            </FlatList>
        </View>
    );
}