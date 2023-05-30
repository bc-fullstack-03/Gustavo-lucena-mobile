import { Image, KeyboardAvoidingView, Platform } from "react-native";
import logo from '../../assets/logo.png'
import { style } from "./style";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input";
import { Envelope, Lock } from "phosphor-react-native";
import { THEME } from "../../theme";
import { Spacer } from "../../components/Spacer";
import { Button } from "../../components/Button"

function Login({ navigation }) {
    return (
        <KeyboardAvoidingView
            style={style.container}
            contentContainerStyle={style.containerPosition}
            behavior={Platform.OS === "ios" ? "padding" : "position"}
        >
            <Image source={logo} resizeMethod="scale" />
            <Heading title="Sysmap Parrot" subtitle="Faça login e começe a usar!" />
            <Input.Root>
                <Input.Icon>
                    <Envelope color={THEME.COLORS.INPUT} />
                    <Input.Input placeholder="Digite seu e-mail" autoCapitalize="none" />
                </Input.Icon>
            </Input.Root>
            <Spacer />
            <Input.Root>
                <Input.Icon>
                    <Lock color={THEME.COLORS.INPUT} />
                    <Input.Input placeholder="**********" autoCorrect={false} autoCapitalize="none" secureTextEntry />
                </Input.Icon>
            </Input.Root>
            <Spacer />
            <Button title="Entrar" onPress={() => {}} ></Button>
        </KeyboardAvoidingView>
    );
}

export default Login;