import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const style = StyleSheet.create({
    profileCard: {
        margin: 12,
        gap: 4,
    },
    profileIdentification: {
        flexDirection: "row",
        alignItems: "center",
    },
    profileNameText: {
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.BOLD,
        fontSize: THEME.FONT_SIZE.MD,
        marginStart: 8,
    },
    followers: {
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        fontSize: THEME.FONT_SIZE.MD,
        marginStart: 8,
    },
    following: {
        color: THEME.COLORS.TEXT,
        fontFamily: THEME.FONT_FAMILY.REGULAR,
        fontSize: THEME.FONT_SIZE.MD,
        marginStart: 8,
    },
    unfollowButton: {
        backgroundColor: THEME.COLORS.BUTTON_700,
        padding: 12,
        minWidth: 240,
        alignItems: "center",
        borderRadius: 12,
    }
});