import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PostProvider } from "../../context/PostContext";
import { PostList } from "../PostList";
import { CreatePost } from "../CreatePost";

const Stack = createNativeStackNavigator();

function Home() {
    return (
        <PostProvider>
            <Stack.Navigator
                screenOptions={{ headerShown: false, statusBarStyle: "dark" }}
            >
                <Stack.Screen name="Posts" component={PostList} />
                <Stack.Screen name="Create" component={CreatePost} />
            </Stack.Navigator>
        </PostProvider>
    );
}

export default Home;