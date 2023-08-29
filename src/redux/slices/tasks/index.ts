import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a type for the slice state
interface CounterState {
    value: Array<Object>|Object;
}

const getDataFromLocalStorage = async() => {
    let value = await AsyncStorage.getItem('_storedList');
    if (value) {
        return JSON.parse(value);
    } else {
        return [];
    }
}

// Define the initial state using that type
// const initialState: CounterState = {
//     value: [],
// }

export const tasksSlice = createSlice({
    name: 'tasks',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState: [],
    reducers: {
        createTask: (state) => {
            []
        },
        updateTask: (state) => {
            []
        },
        deleteTask: (state) => {
            []
        },
        setTasks: (state, value) => {
            return value.payload;
        }
        // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})

export const { createTask, updateTask, deleteTask, setTasks } = tasksSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default tasksSlice.reducer