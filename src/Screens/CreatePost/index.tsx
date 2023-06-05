import { useContext, useState } from "react"
import { Text, View } from "react-native";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as PostContext } from "../../context/PostContext";
import { style } from "./style";
import { UserCircle } from "phosphor-react-native";
import { Input } from "../../components/Input";
import { THEME } from "../../theme";
import { Spacer } from "../../components/Spacer";
import { Button } from "../../components/Button";
import PostImagePicker from "../../components/PostImagePicker";
import { File } from "../../models/File";

export function CreatePost() {
    const { user } = useContext(AuthContext);
    const { createPost } = useContext(PostContext);
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File>();

    return (
        <View style={style.container} >
            <View style={style.heading}>
                <UserCircle color="white" size={48} weight="thin" />
                <Text style={style.userNameText} >{user}</Text>
            </View>
            <Spacer>
                <Input.Root>
                    <Input.Input
                        value={content}
                        onChangeText={setContent}
                        placeholder="Descrição do post"
                        placeholderTextColor={THEME.COLORS.INPUT}
                        autoCorrect={false}
                    />
                </Input.Root>
            </Spacer>
            <Spacer>
                <PostImagePicker onFileLoaded={setImage} />
                <Spacer />
                <Button
                    title="Postar"
                    onPress={() => {
                        createPost({ content, image })
                    }}
                />
            </Spacer>
        </View>
    );
}
