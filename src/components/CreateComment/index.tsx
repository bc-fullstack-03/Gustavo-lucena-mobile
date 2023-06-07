import { useContext, useState } from "react"
import { Text, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";
import { style } from "./style";
import { UserCircle } from "phosphor-react-native";
import { Input } from "../Input";
import { THEME } from "../../theme";
import { Spacer } from "../Spacer";
import { Button } from "../Button";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";

export function CreateComment({ postId }) {
    const { user } = useContext(AuthContext);
    const { createComment } = useContext(PostContext);
    const [comment, setComment] = useState<string>("");

    return (
        <KeyboardAvoidingView style={style.container}
        contentContainerStyle={style.containerPosition}
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        >
            <View style={style.heading}>
                <UserCircle color="white" size={48} weight="thin" />
                <Text style={style.userNameText} >{user}</Text>
            </View>
            <Spacer>
                <Input.Root>
                    <Input.Input
                        value={comment}
                        onChangeText={setComment}
                        placeholder="Comentário"
                        placeholderTextColor={THEME.COLORS.INPUT}
                        autoCorrect={false}
                    />
                </Input.Root>
            </Spacer>
            <Spacer>
                <Button
                    title="Comentar"
                    onPress={() => {
                        createComment(comment, postId);
                        setComment("")
                    }}
                />
            </Spacer>
        </KeyboardAvoidingView>
    );
}
