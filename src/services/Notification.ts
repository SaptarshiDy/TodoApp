import React from 'react';
import notifee, { TimestampTrigger, TriggerType, TimeUnit, RepeatFrequency, IntervalTrigger } from '@notifee/react-native';

const ping = async () => {

    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
        title: 'You have some pending task 😯',
        body: 'Main body content of the notification',
        android: {
            channelId,
            // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            pressAction: {
                id: 'default',
            },
        },
    });

}

const schedule = async() => {

    // const time = new Date(Date.now());
    // time.setMinutes(time.getMinutes() + 1);
    // const trigger: TimestampTrigger = {
    //     alarmManager: true,
    //     type: TriggerType.TIMESTAMP,
    //     timestamp: time.getTime(),
    //     repeatFrequency: RepeatFrequency.HOURLY,
    // };

    const trigger: IntervalTrigger = {
        type: TriggerType.INTERVAL,
        interval: 15,
        timeUnit: TimeUnit.MINUTES
    };

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });

    await notifee.createTriggerNotification(
        {
            title: 'You have some pending task 😯',
            body: 'Complete your all task to having a grateful day.',
            android: {
                channelId,
                pressAction: {
                    id: 'default',
                },
            },
        },
        trigger,
    );

}

export default { ping, schedule };