import { Text, TouchableOpacity } from "react-native";
import { AuthForm } from "../../components/AuthForm";
import { style } from "./style";

function SingUp({navigation}) {
    return (
        <>
            <AuthForm authFomrTitle="Faça o cadastro e comece a usar!" submitFomrButtonText="Cadastrar" />
            <TouchableOpacity onPress={() => { navigation.navigate("Login") }} >
                <Text style={style.link}>Já possui conta? Entre agora!</Text>
            </TouchableOpacity>
        </>
    );
}

export default SingUp;