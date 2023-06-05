import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { style } from "./style";
import { PencilCircle, UserCircle } from "phosphor-react-native";

export function HomeHeader({ navigation, user }) {
    return (
        <View style={style.container} >
            <UserCircle color="white" size={48} weight="thin" />
            <Text style={style.userNameText}>{user}</Text>
            <View style={{ flex: 1 }} ></View>
            <TouchableOpacity onPress={() => navigation.navigate("CreatePost")} >
                <PencilCircle color="white" size={48} weight="thin" />
            </TouchableOpacity>
        </View>
    );
}