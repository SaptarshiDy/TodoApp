import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a type for the slice state
interface CounterState {
    value: Array|Object;
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
const initialState: CounterState = {
    value: getDataFromLocalStorage(),
}

export const tasksSlice = createSlice({
    name: 'tasks',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        taskCreate: (state) => {
            state.value += 1
        },
        taskUpdate: (state) => {
            state.value -= 1
        },
        taskDelete: (state) => {
            state.value -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
    },
})

export const { taskCreate, taskUpdate, taskDelete, incrementByAmount } = tasksSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default tasksSlice.reducer