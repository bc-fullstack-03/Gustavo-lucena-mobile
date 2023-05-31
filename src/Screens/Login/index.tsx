import { View, Text, TouchableOpacity } from "react-native";
import { style } from "./style";
import { AuthForm } from "../../components/AuthForm";

function Login({ navigation }) {
    return (
        <>
            <AuthForm authFomrTitle="Faça o login e comece a usar!" submitFomrButtonText="Entrar" />
            <TouchableOpacity onPress={() => { navigation.navigate("SingUp") }} >
                <Text style={style.link}>Não possui uma conta? Crie uma agora!!</Text>
            </TouchableOpacity>
        </>
    );
}

export default Login;