import React, { ReactNode } from 'react';
import { View } from 'react-native'
import { style } from './style';

interface SpacerProps {
    children?: ReactNode;
}

export function Spacer(props: SpacerProps) {
    return (
        <View style={style.container} >
            {props.children}
        </View>
    );
}