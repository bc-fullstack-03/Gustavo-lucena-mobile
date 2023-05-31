import { useContext } from 'react'
import { Text, TouchableOpacity } from "react-native";
import { style } from "./style";
import { AuthForm } from "../../components/AuthForm";
import { Context as AuthContext } from "../../context/AuthContext";
import { Spacer } from '../../components/Spacer';


function Login({ navigation }) {
    const { login, errorMessage } = useContext(AuthContext);

    return (
        <>
            <AuthForm
                authFomrTitle="Faça o login e comece a usar!"
                submitFomrButtonText="Entrar"
                isregister={false}
                submitFormButtonAction={login}
            />
            <TouchableOpacity onPress={() => { navigation.navigate("SingUp") }} >
                <Text style={style.link}>Não possui uma conta? Crie uma agora!!</Text>
            </TouchableOpacity>
            {errorMessage && (
                <Spacer>
                    <Text style={style.error}>{errorMessage}</Text>
                </Spacer>
            )}
        </>
    );
}

export default Login;