import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Button, AppState, AppStateStatus, TouchableOpacity  } from 'react-native';
import TaskBox from '../components/TaskBox';
import { useState, useEffect } from 'react';
import TaskModal from '../components/TaskModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigation from '../components/BottomNavigation';
// import Notifications from './Services/Notifications';
// import { StatusBar } from 'expo-status-bar';
// import BackgroundJobs from './Services/Background';

import { useAppDispatch, useAppSelector } from '../redux/hooks/index';
import { createTask, updateTask, deleteTask, getTasks } from '../redux/slices/tasks/index';

interface Task {
    id?: null|number;
    title: null|string;
    subtitle: null|string;
}

function App({navigation}) {

    // const [tasks, setTasks] = useState([]);
    const tasks = useAppSelector(state => state.tasks);

    const [editTask, setEditTask] = useState({});
    const [isTaskModal, setIsTaskModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        getDataFromLocalStorage();
        // clearDataFromLocalStorage();
    }, []);

    useEffect(() => {
        setDataOnLocalStorage();
    }, [tasks]);

    const handleAppStateChange = (nextAppState: string) => {
        if (nextAppState === 'inactive' || nextAppState === 'background') {
            // setDataOnLocalStorage();
        }
    };

    const setDataOnLocalStorage = async() => {
        const value = JSON.stringify(tasks);
        await AsyncStorage.setItem(
            '_storedList',
            value
        );
    };

    const getDataFromLocalStorage = async() => {
        setIsLoading(true);
        const value = await AsyncStorage.getItem('_storedList');
        if (value) dispatch(getTasks(JSON.parse(value)));
        setTimeout(function() {
            setIsLoading(false);
        }, 1000);
    }

    const clearDataFromLocalStorage = async() => {
        await AsyncStorage.setItem(
            '_storedList',
            JSON.stringify([])
        );
    }

    return (

            <View style={styles.container}>

                <View style={{width: '100%', paddingHorizontal: 20}}>
                    <View style={{marginTop: 14, padding: 14, backgroundColor: '#fff', borderRadius: 4, shadowColor: '#000', shadowOffset: {
            width: 0,
            height: 2,
        }, shadowOpacity: 0.25,
        shadowRadius: 4, elevation: 8,}}>
                        <Text>
                            Search Your Task . . .
                        </Text>
                    </View>
                </View>

                {
                    isLoading ? 
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                        <ActivityIndicator size="large" color="#5452bf" />
                    </View>
                    :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, marginVertical: 10}}>
                        {
                            (tasks.length !== 0) ?
                                
                                    <ScrollView
                                        showsVerticalScrollIndicator={false} 
                                        contentContainerStyle={{ flexGrow: 1, }}
                                    >
                                        {[...tasks].sort((a, b) => b.id - a.id).map((task) => (
                                            <TouchableOpacity onPress={() => {
                                                navigation.navigate('TaskView', {task: task});
                                            }}>
                                                <TaskBox
                                                    key={task.id}
                                                    task={task}
                                                    onEditTask={(data: number) => {
                                                        const task = tasks.find(item => item.id === data);
                                                        setEditTask(task);
                                                        setIsTaskModal(true);
                                                    }}
                                                    onDeleteTask={(data: null|number) => {
                                                        dispatch(deleteTask(data));
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                :
                                <Text style={{ fontSize: 26 }}>
                                    No Task Found
                                </Text>
                        }
                    </View>
                }
                

                <TaskModal
                    task={editTask}
                    isModal={isTaskModal}
                    onCreateTask={(data: Task) => {
                        data.id = (tasks.length !== 0) ? tasks[tasks.length - 1].id + 1 : 1;
                        dispatch(createTask(data));
                    }}
                    onEditTask={(data: Task) => {
                        dispatch(updateTask(data));
                        setEditTask({});
                        setIsTaskModal(false);
                    }}
                    closeModal={() => {
                        setEditTask({});
                        setIsTaskModal(false);
                    }}
                />

                <BottomNavigation
                    onCreateTaskModal={() => {
                        setIsTaskModal(true);
                    }}
                />

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

export default App;