import React from 'react';
import { Text, TouchableOpacityProps, TouchableOpacity } from 'react-native'
import { style } from './style';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button(props: ButtonProps) {
    return (
        <TouchableOpacity style={style.container} {...props}>
            <Text style={style.title}>{props.title}</Text>
        </TouchableOpacity>
    );
}