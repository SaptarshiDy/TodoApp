import React,{ useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Pressable, Modal, TouchableOpacity } from 'react-native';

interface Props {
    task: any;
    onEditTask: (data: number) => void;
    onDeleteTask: (data: null|number) => void;
}

const TaskBox = ({ task, onEditTask, onDeleteTask } : Props) => {

    return (
        <View style={styles.box}>
            <Text style={styles.title} numberOfLines={1}>
                { task.title }
            </Text>
            <Text style={styles.subtitle} numberOfLines={2}>
                { task.subtitle }
            </Text>

            <View style={styles.buttonGroup}>
                <Pressable 
                    style={[styles.button, {backgroundColor: '#5452bf'}]}
                    onPress={() => {
                        onEditTask(task.id)
                    }} 
                >
                    <Text style={{color: 'white', fontSize: 16}}>Task Edit</Text>
                </Pressable>
                <Pressable 
                    onPress={() => onDeleteTask(task.id)} 
                    style={[styles.button, {backgroundColor: '#f72c2c'}]}
                >
                    <Text style={{color: 'white', fontSize: 16}}>Delete</Text>
                </Pressable>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    box: {
        padding: 14,
        backgroundColor: '#cbd4ef',
        borderRadius: 4,
        marginVertical: 10,
        minWidth: '100%',
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

    buttonGroup: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 10,
        paddingVertical: 8,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        // padding: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        elevation: 3,
        color: 'white',
    },
    buttonText: { 
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        flexWrap: 'wrap',
    },
    modalButton: {
        padding: 8,
        width: '50%',
        borderRadius: 4,
    },
});

export default TaskBox;