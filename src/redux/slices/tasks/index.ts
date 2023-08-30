import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a type for the slice state
interface CounterState {
    value: Array<Object>|Object;
}

interface Task {
    id: number|null;
    title: string|null;
    subtitle: string|null;
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
        createTask: (state: Array<Task>, value) => {
            return [...state, value.payload];
        },
        updateTask: (state: Array<Task>, value) => {
            let data = value.payload;
            let index = state.findIndex((x => x.id == data.id));
            if (index) {
                state[index].title = data.title;
                state[index].subtitle = data.subtitle;
            }
            return state;
        },
        deleteTask: (state: Array<Task>, value) => {
            return state.filter(item => item.id !== value.payload);
        },
        getTasks: (state, value) => {
            return value.payload;
        }
        // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})

export const { createTask, updateTask, deleteTask, getTasks } = tasksSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default tasksSlice.reducer