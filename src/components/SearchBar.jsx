import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, Modal, TouchableOpacity, Button, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../redux/hooks/index';
import { createTask, updateTask, deleteTask, getTasks } from '../redux/slices/tasks/index';

const SearchBar = () => {

    const onFocuseInput = useRef();
    const [query, setQuery] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const tasks = useAppSelector(state => state.tasks);
    const navigation = useNavigation();

    useEffect(() => {
        if (isModal === false) {
            setQuery('');
            setFilteredTasks([]);
        }
    }, [isModal])

    const filterQuery = (value) => {
        if (value.length !== 0) {
            return setFilteredTasks([...tasks].filter(x => x.title.includes(value)));
        } else {
            return setFilteredTasks([]);
        }
    }

    return (
        <View style={styles.container}>
            
            <View style={styles.searchContainer}>
                <TouchableOpacity
                    style={{ paddingVertical: 14, paddingHorizontal: 12 }}
                    onPress={() => {
                        setIsModal(true);
                    }}
                >
                    <Text>
                        Search your task...
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={isModal}
                onRequestClose={() => {}}
            >

                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        
                        <TextInput
                            ref={onFocuseInput}
                            onLayout={() => {
                                setTimeout(() => onFocuseInput.current.focus(), 100)
                            }}
                            style={{width: '85%'}}
                            onChangeText={(value) => {
                                setQuery(value);
                                filterQuery(value);
                            }}
                            value={query}
                            placeholder="Search your task..."
                        />

                        <TouchableOpacity 
                            style={{backgroundColor: 'white', flex: 1, alignItems: 'center'}}
                            onPress={() => {
                                setIsModal(false);
                            }}
                        >
                            <Icon name="closecircle" size={25} color="#c7c7c7" />
                        </TouchableOpacity>

                    </View>

                    <View style={styles.resultContainer}>

                        {
                            filteredTasks.length !== 0 || query.length <= 1 ?
                            
                                filteredTasks.map((task) => (
    
                                    <View 
                                        key={task.id}
                                        style={styles.resultBox}
                                    >

                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('TaskView', {task: task});
                                            }}
                                        >
                                            <Text style={{fontSize: 16, fontWeight: 500}} numberOfLines={1}>
                                                {task.title}
                                            </Text>
                                            <Text  numberOfLines={1}>
                                                {task.subtitle}
                                            </Text>
                                        </TouchableOpacity>
    
                                    </View>
    
                                ))
                            
                            :
                                <View style={styles.resultBox}>
                                    <Text  numberOfLines={1}>
                                        No Results Found !
                                    </Text>
                                </View>
                        }

                    </View>
                    

                </View>

            </Modal>

        </View>

        

    );

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
    },

    searchContainer: {
        marginTop: 20,
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
        // borderWidth: 2,
        // borderColor: '#7f7ed6',
    },

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

        width: '100%',
        paddingHorizontal: 20,

    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 4,

        marginTop: 20,
        paddingVertical: 0,
        paddingHorizontal: 12,

        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexWrap: 'wrap',
        gap: 6,

        flexDirection: 'row',
    },

    resultContainer: {
        marginTop: 20,
        flexDirection: 'column',
        gap: 20,
    },

    resultBox: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderRadius: 4,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 8,
    }
});

export default SearchBar;