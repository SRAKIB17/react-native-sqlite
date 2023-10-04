import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function Button({
    onPress
}: {
    onPress: () => void
}) {
    return (
        <TouchableOpacity onPress={onPress}>

        </TouchableOpacity>
    );
}
