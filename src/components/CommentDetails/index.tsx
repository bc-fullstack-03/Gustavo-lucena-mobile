import React from "react";
import { View, Text } from "react-native";
import { style } from "./style";
import { UserCircle } from "phosphor-react-native";
import { Comment } from "../../models/Comment";
import { SafeAreaView } from "react-native";

interface CommentProps {
    comment: Comment;
}

export function CommentDetails({ comment }: CommentProps) {

    return (
        <SafeAreaView style={style.container}>
            <View style={style.userContainer} >
                <UserCircle size={24} weight='light' color="white" />
                <Text style={style.useNameText} >{comment.userEmail}</Text>
            </View>
            <Text style={style.useContentText} >{comment.content}</Text>
        </SafeAreaView>
    );
}