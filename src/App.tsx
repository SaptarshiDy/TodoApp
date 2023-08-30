import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Button, AppState, AppStateStatus  } from 'react-native';
import TaskBox from './Components/TaskBox';
import { useState, useEffect } from 'react';
import TaskModal from './Components/TaskModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigation from './Components/BottomNavigation';
// import Notifications from './Services/Notifications';
// import { StatusBar } from 'expo-status-bar';
// import BackgroundJobs from './Services/Background';

import { useAppDispatch, useAppSelector } from './redux/hooks/index';
import { createTask, updateTask, deleteTask, getTasks } from './redux/slices/tasks/index';

interface Task {
    id?: null|number;
    title: null|string;
    subtitle: null|string;
}

function App() {

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

    /**
     * Convert Create To Redux
     * Convert Delete To Redux
     * Convert Edit To Redux
     * Go with View...
    */

    return (

            <View style={styles.container}>
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
        // marginTop: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
    },
});

export default App;