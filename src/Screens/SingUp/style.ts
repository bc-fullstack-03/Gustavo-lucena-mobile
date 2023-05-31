import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const style = StyleSheet.create({
    link: {
        color: THEME.COLORS.CAPTION_400,
        fontSize: THEME.FONT_SIZE.SM,
        textAlign: "center",
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        textDecorationLine: "underline",
    },
})