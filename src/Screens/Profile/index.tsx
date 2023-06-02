import { useContext } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { UserCircle } from "phosphor-react-native";
import { style } from "./style";
import { Context as AuthContext } from "../../context/AuthContext";
import { Button } from "../../components/Button";

function Profile() {
    const { profile, logout } = useContext(AuthContext);

    return (
        <SafeAreaView style={style.container}>
            <View style={style.heading}>
                <UserCircle color="white" size={48} weight="thin" />
                <Text style={style.userNameText} >{profile}</Text>
            </View>
            <Button title="Sair" onPress={logout} ></Button>
        </SafeAreaView>
    );
}

export default Profile;