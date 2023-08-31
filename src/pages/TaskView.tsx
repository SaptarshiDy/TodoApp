import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    route: Object;
}

const TaskView = ({ route } : Props) => {
    const { task } = route.params;
    return (
        <View style={styles.container}>
            <Text>
                {task.title}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TaskView;