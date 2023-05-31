import { useContext } from 'react'
import { Context as AuthContext } from "../../context/AuthContext";
import { Text, TouchableOpacity } from "react-native";
import { AuthForm } from "../../components/AuthForm";
import { style } from "./style";
import { Spacer } from '../../components/Spacer';

function SingUp({ navigation }) {
    const { register, errorMessage } = useContext(AuthContext);

    return (
        <>
            <AuthForm
                authFomrTitle="Faça o cadastro e comece a usar!"
                submitFomrButtonText="Cadastrar"
                isregister={true}
                submitFormButtonAction={register}
            />
            <TouchableOpacity onPress={() => { navigation.navigate("Login") }} >
                <Text style={style.link}>Já possui conta? Entre agora!</Text>
            </TouchableOpacity>
            {errorMessage && (
                <Spacer>
                    <Text style={style.error}>{errorMessage}</Text>
                </Spacer>
            )}
        </>
    );
}

export default SingUp; 