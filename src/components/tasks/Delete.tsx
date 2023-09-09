import React from 'react';
import { Button, StyleSheet, Text, View, Pressable, Modal, TouchableOpacity } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../redux/hooks/index';
import { deleteTask } from '../../redux/slices/tasks/index';

interface Props {
    deleteTaskId: number | null,
    onCloseModal: () => void,
}

const TaskDelete = ({ deleteTaskId, onCloseModal }: Props) => {

    const dispatch = useAppDispatch();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={deleteTaskId ? true : false}
            onRequestClose={() => {
                onCloseModal();
            }}>
            <View style={styles.modalContainer}>
                <View style={styles.modalView}>

                    <Text style={{ width: '100%', fontSize: 22 }}>
                        Are you sure ?
                    </Text>

                    <Text style={{ width: '100%', fontSize: 16, marginBottom: 20, marginTop: 10 }}>
                        You want to delete this task, Note data will deleted permanently.
                    </Text>

                    <View style={{ flexDirection: 'row', gap: 8 }}>


                        <TouchableOpacity
                            onPress={() => {
                                onCloseModal();
                            }}
                            style={[styles.modalButton, { backgroundColor: '#f72c2c' }]}
                        >
                            <Text style={styles.buttonText}>
                                Close
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                dispatch(deleteTask(deleteTaskId));
                                onCloseModal();
                            }}
                            style={[styles.modalButton, { backgroundColor: '#5452bf' }]}
                        >
                            <Text style={styles.buttonText}>
                                Delete Task
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </View>
        </Modal>
    );

}

const styles = StyleSheet.create({

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

export default TaskDelete;