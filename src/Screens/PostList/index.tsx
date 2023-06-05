import { useContext, useEffect } from "react"
import { View, SafeAreaView, FlatList, Text } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";

import { style } from "./style";
import { HomeHeader } from "../../components/HomeHeader";
import { PostItem } from "../../components/PostItem";

export function PostList({ navigation }) {
    const { user } = useContext(AuthContext);
    const { posts, getPosts } = useContext(PostContext);
    
    useEffect(() => {
        getPosts();
    }, [])

    return (
        <SafeAreaView style={style.container}>
            <HomeHeader navigation={navigation} user={user} />
            <View style={style.content}>
                <FlatList
                    data={posts}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <PostItem post={item} />
                    )}
                >

                </FlatList>
            </View>
        </SafeAreaView>
    );
}
