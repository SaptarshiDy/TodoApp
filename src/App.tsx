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
import { createTask, updateTask, setTasks } from './redux/slices/tasks/index';

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
        // setDataOnLocalStorage();
        // AppState.addEventListener('change', handleAppStateChange);
        // return () => {
        //     AppState.addEventListener('change', handleAppStateChange);
        // }
    }, []);

    // useEffect(() => {
    //     setDataOnLocalStorage();
    // }, [tasks]);

    const handleAppStateChange = (nextAppState: string) => {
        if (nextAppState === 'inactive' || nextAppState === 'background') {
            // setDataOnLocalStorage();
        }
    };

    // const setDataOnLocalStorage = async() => {
    //     // const value = JSON.stringify(tasks);
    //     // await AsyncStorage.setItem(
    //     //     '_storedList',
    //     //     value
    //     // );

    //     await AsyncStorage.setItem(
    //         '_storedList',
    //         JSON.stringify([
    //             {
    //                 id: 1,
    //                 title: 'Hello From Redux !',
    //                 subtitle: 'Hi',
    //             }
    //         ])
    //     );
    // }

    const getDataFromLocalStorage = async() => {
        setIsLoading(true);
        const value = await AsyncStorage.getItem('_storedList');
        if (value) setTasks(JSON.parse(value)); dispatch(setTasks(JSON.parse(value)));
        setTimeout(function() {
            setIsLoading(false);
        }, 1000);
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
                                                    const updatedTasks = tasks.filter(item => item.id !== data);
                                                    setTasks(updatedTasks);
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
                        setTasks((prevForm) => ([...prevForm, data]));
                    }}
                    onEditTask={(data: Task) => {
                        const updateTask = tasks.map(item =>
                            item.id === data.id ? {
                                ...item, title: data.title, subtitle: data.subtitle
                            } : item
                        );
                        setTasks(updateTask);
                    }}
                    closeModal={() => {
                        setEditTask({});
                        setIsTaskModal(false);
                        // BackgroundJobs.closeService()
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