import { TextInputProps, TextInput, View } from "react-native";
import { style } from "./style";
import { ReactNode } from "react";
import { THEME } from "../../theme";

interface TextInputRootProps {
    children: ReactNode;
}

function TextInputRoot(props: TextInputRootProps) {
    return (
        <View style={style.container} >
            {props.children}
        </View>
    );
}

interface TextInputInputProps extends TextInputProps {

}

function TextInputInput(props: TextInputInputProps) {
    return (
        <TextInput style={style.input}
            {...props}
            placeholderTextColor={THEME.COLORS.INPUT}
        ></TextInput>
    )
}

interface TextInputIconProps {
    children: ReactNode;
}

function TextInputIcon(props: TextInputIconProps) {
    return (
        <>
            {props.children}
        </>
    );
}

export const Input = {
    Root: TextInputRoot,
    Input: TextInputInput,
    Icon: TextInputIcon,
}