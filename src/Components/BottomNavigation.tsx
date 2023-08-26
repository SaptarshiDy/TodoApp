import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface Props {
    onCreateTaskModal: () => void;
}

const BottomNavigation = ({onCreateTaskModal}: Props) => {
    
    return (

        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => {
                    onCreateTaskModal();
                }} 
                style={styles.footerButton} 
            >
                <Icon name="plus" size={50} color="#fff" />
            </TouchableOpacity>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dacff7',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 32,
        borderRadius: 0,
        alignItems: 'center',
        borderTopWidth: 2,
        borderColor: '#bab9e5',  
    },

    footerButton: {
        backgroundColor: '#5452bf',
        position: 'absolute',
        bottom: 30,
        width: '24%',
        padding: 10,
        borderRadius: 100,

        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})

export default BottomNavigation;