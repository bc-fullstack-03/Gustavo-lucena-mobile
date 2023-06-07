import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const style = StyleSheet.create({
    container: {
        paddingTop: 12,
    },
    heading: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingTop: 6,
        borderTopColor: THEME.COLORS.BORDER,
        borderTopWidth: 1,
    },
    userNameText: {
        fontFamily: THEME.FONT_FAMILY.BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        color: THEME.COLORS.TEXT,
        marginStart: 12,
    },
    containerPosition: {
    },

});