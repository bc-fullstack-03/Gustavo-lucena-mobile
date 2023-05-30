import { Text, View, Button } from "react-native";

function SingUp({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>SingUp</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}

export default SingUp;