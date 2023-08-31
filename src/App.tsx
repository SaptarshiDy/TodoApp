import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Button, AppState, AppStateStatus  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from './redux/store';
import { Provider } from 'react-redux';

//Import Screens
import TaskListing from './pages/TaskList';
import TaskView from './pages/TaskView';

function App() {

    const Stack = createNativeStackNavigator();

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name="TaskList"
                        component={TaskListing}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="TaskView"
                        component={TaskView}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;