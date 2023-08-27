import React from 'react';
import BackgroundService from 'react-native-background-actions';

// const testService = () => {
//     const sleep = () => new Promise((resolve) => setTimeout(() => resolve(), 5000)); //time

//     // You can do anything in your task such as network requests, timers and so on,
//     // as long as it doesn't touch UI. Once your task completes (i.e. the promise is resolved),
//     // React Native will go into "paused" mode (unless there are other tasks running,
//     // or there is a foreground app).
//     const veryIntensiveTask = async (taskDataArguments) => {
//         // Example of an infinite loop task
//         const { delay } = taskDataArguments;
//         await new Promise( async (resolve) => {
//             for (let i = 0; BackgroundService.isRunning(); i++) {
//                 console.log(i);
//                 await sleep(delay);
//             }
//         });
//     };

//     const options = {
//         taskName: 'Example',
//         taskTitle: 'ExampleTask title',
//         taskDesc: 'ExampleTask description',
//         taskIcon: {
//             name: 'ic_launcher',
//             type: 'mipmap',
//         },
//         color: '#ff00ff',
//         linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
//         parameters: {
//             delay: 1000,
//         },
//     };


//     await BackgroundService.start(veryIntensiveTask, options);
//     await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'}); // Only Android, iOS will ignore this call
//     // iOS will also run everything here in the background until .stop() is called
//     await BackgroundService.stop();
// }

const sleep = (time: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

const veryIntensiveTask = async (delay: number) => {
    
    
    // Example of an infinite loop task


    await new Promise( async (resolve) => {
        // console.warn('Job RUNING', delay);
        for (let i = 0; BackgroundService.isRunning(); i++) {
            if (i == 100) {
                closeService();
            } 
            console.log(i);
            await sleep(delay);
        }
    });
    
};

const testService = async () => {
    await BackgroundService.start(veryIntensiveTask(1000), options);
}

const closeService = async () => {
    await BackgroundService.stop();
}

    const options = {
        taskName: 'Example',
        taskTitle: 'ExampleTask title',
        taskDesc: 'ExampleTask description',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
        parameters: {
            delay: 5000,
        },
    };

export default {testService, closeService};