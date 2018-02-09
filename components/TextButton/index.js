import React from 'react';
import {
    TouchableHighlight,
    Text,
} from 'react-native';
import styles from './styles';

const TextButton = () => (
    <TouchableHighlight style={styles.container}>
        <Text style={styles.button}>Click Me</Text>
    </TouchableHighlight>
);

export default TextButton;