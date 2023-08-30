import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, KeyboardAvoidingView, TextInput, TextArea } from 'react-native';
import React,{ useState, useEffect } from 'react';

interface Props {
    task: Form|object;
    onCreateTask: (form: Form) => void;
    onEditTask: (form: Form) => void;
    closeModal: () => void;
    isModal: boolean,
}

interface Form {
    id?: null|number;
    title: null|string;
    subtitle: null|string;
}

const TaskModal = ({task, isModal, onCreateTask, onEditTask, closeModal} : Props) => {

    const [isEditModal, setEditModal] = useState(false);
    
    const [form, setForm] = useState<Form>({
        id: null,
        title: null,
        subtitle: null,
    });

    useEffect(() => {
        if (typeof task === 'object' && Object.keys(task).length !== 0) {
            setEditModal(true);
            setForm((prevForm) => ({
                id: task?.id,
                title: task?.title,
                subtitle: task?.subtitle,
            }));
        }
    }, [task]);

    return (
        <View style={styles.container}>
            
            <Modal
                animationType="slide"
                transparent={false} //Background Transparent
                visible={isModal}
                onRequestClose={() => {
                    setForm(() => ({
                        id: null,
                        title: null,
                        subtitle: null,
                    }));
                    closeModal();
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>

                        <View style={{width: '100%', gap: 6}}>
                            <TextInput
                                style={styles.modalInput}
                                onChangeText={(value) => {
                                    setForm((prevForm) => ({
                                        ...prevForm,
                                        title: value,
                                    }));
                                }}
                                value={form.title}
                                placeholder="Enter task title"
                            />
                            <TextInput
                                multiline = {true}
                                numberOfLines = {4}
                                style={[styles.modalInput, {height:100, textAlignVertical: 'top'}]}
                                onChangeText={(value) => {
                                    setForm((prevForm) => ({
                                        ...prevForm,
                                        subtitle: value,
                                    }));
                                }}
                                value={form.subtitle}
                                placeholder="Type about your task..."
                            />
                        </View>

                        <View style={{flexDirection: 'row', gap: 6}}>
                            
                            <TouchableOpacity 
                                onPress={() => {
                                    setForm((prevForm) => ({
                                        id: null,
                                        title: null,
                                        subtitle: null,
                                    }));
                                    setEditModal(false);
                                    closeModal();
                                }} 
                                style={[styles.modalButton, {backgroundColor: '#f72c2c'}]}
                            >
                                <Text style={styles.modalButtonText}>
                                    Close
                                </Text>
                            </TouchableOpacity>

                            {
                                isEditModal ?
                                <TouchableOpacity 
                                    onPress={() => {
                                        onEditTask(form);
                                        setForm(() => ({
                                            id: null,
                                            title: null,
                                            subtitle: null,
                                        }));
                                        closeModal();
                                    }} 
                                    style={[styles.modalButton, {backgroundColor: '#5452bf'}]} 
                                >
                                    <Text style={styles.modalButtonText}>
                                        Task Edit
                                    </Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity 
                                    onPress={() => {
                                        onCreateTask(form);
                                        setForm(() => ({
                                            id: null,
                                            title: null,
                                            subtitle: null,
                                        }));
                                        closeModal();
                                    }} 
                                    style={[styles.modalButton, {backgroundColor: '#5452bf'}]} 
                                >
                                    <Text style={styles.modalButtonText}>
                                        Add Task
                                    </Text>
                                </TouchableOpacity>
                            }
                        
                            
                        </View>

                    </View>
                    
                </View>
            </Modal>
            

        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        // flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    modalView: {
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
        gap: 6,
    },
    modalButton: {
        padding: 8,
        width: '50%',
        borderRadius: 4,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    modalInput: {
        width: '100%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 4,
    }
});

export default TaskModal;