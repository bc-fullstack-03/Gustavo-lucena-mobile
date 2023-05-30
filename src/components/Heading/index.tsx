import { View, Text, ViewProps } from 'react-native'
import { style } from './style'

interface HeadingProps extends ViewProps {
    title: string;
    subtitle: string;
}

export function Heading(props: HeadingProps) {
    return (
        <View style={style.container}>
            <Text style={style.title}>{props.title}</Text>
            <Text style={style.subtitle}>{props.subtitle}</Text>
        </View>
    );
}