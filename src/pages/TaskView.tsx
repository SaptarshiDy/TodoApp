import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    route: Object;
}

const TaskView = ({ route } : Props) => {
    const { task } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {task.title}
            </Text>

            <View style={{borderTopWidth: 0.5, borderColor: '#dbdbdb'}}></View>

            <Text style={styles.subtitle}>
                {task.subtitle}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 14,
        gap: 4,
    },
    title: {
        fontSize: 22,
        paddingVertical: 4,
        color: '#5452bf',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        paddingVertical: 4,
        color: '#5452bf',
    },
});

export default TaskView;