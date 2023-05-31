import React, { useState } from "react"
import { Image, KeyboardAvoidingView, Platform } from "react-native";
import logo from '../../assets/logo.png'
import { style } from "./style";
import { Heading } from "../../components/Heading";
import { Input } from "../../components/Input";
import { Envelope, Lock, User } from "phosphor-react-native";
import { THEME } from "../../theme";
import { Spacer } from "../../components/Spacer";
import { Button } from "../../components/Button"
import { Auth } from "../../models/Auth";

interface AuthFormProps {
    authFomrTitle: string;
    submitFomrButtonText: string;
    isregister: boolean;
    submitFormButtonAction: (auth: Auth) => void;
}

export function AuthForm(props: AuthFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <KeyboardAvoidingView
            style={style.container}
            contentContainerStyle={style.containerPosition}
            behavior={Platform.OS === "ios" ? "padding" : "position"}
        >
            <Image source={logo} resizeMethod="scale" />
            <Heading title="Sysmap Parrot" subtitle={props.authFomrTitle} />

            {
                props.isregister &&
                <Input.Root>
                    <Input.Icon>
                        <User color={THEME.COLORS.INPUT} />
                        <Input.Input
                            value={name}
                            onChangeText={setName}
                            placeholder="Digite seu nome"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </Input.Icon>
                </Input.Root>
            }
            <Spacer />
            <Input.Root>
                <Input.Icon>
                    <Envelope color={THEME.COLORS.INPUT} />
                    <Input.Input
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </Input.Icon>
            </Input.Root>
            <Spacer />
            <Input.Root>
                <Input.Icon>
                    <Lock color={THEME.COLORS.INPUT} />
                    <Input.Input
                        value={password}
                        onChangeText={setPassword}
                        placeholder="**********"
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry
                    />
                </Input.Icon>
            </Input.Root>
            <Spacer />
            <Button title={props.submitFomrButtonText} onPress={() => {
                props.submitFormButtonAction({ email, password, name })
            }} ></Button>
        </KeyboardAvoidingView>
    );
}