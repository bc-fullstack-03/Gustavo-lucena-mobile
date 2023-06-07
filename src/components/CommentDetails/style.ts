import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const style = StyleSheet.create({
    container: {    
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderTopColor: THEME.COLORS.BORDER,
        borderTopWidth: 1,
    },
    userContainer: {
        flexDirection: "row",
    },
    useNameText: {
        marginLeft: 8,
        color: THEME.COLORS.TEXT,
    },
    useContentText: {
        color: THEME.COLORS.TEXT,
    }
});