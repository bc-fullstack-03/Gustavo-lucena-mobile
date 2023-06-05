import * as SecureStore from "expo-secure-store"

async function getAuthHeader() {
    const token = await SecureStore.getItemAsync("token");

    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    return authHeader;
}

async function getUserId() {
    const userId = await SecureStore.getItemAsync("userId");
    return userId;
}

async function getUser() {
    const user = await SecureStore.getItemAsync("user");
    return user;
}

export { getAuthHeader, getUserId, getUser };