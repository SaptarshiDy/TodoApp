import BackgroundFetch from 'react-native-background-fetch';

const Background = async () => {

    const status = await BackgroundFetch.configure({
      minimumFetchInterval: 1,
      forceAlarmManager: true,
      startOnBoot: true,
      stopOnTerminate: false,
    }, handleTask, onTimeout);
  
    console.log('[ RNBF STATUS ]', status);
  
}

const handleTask = async (taskId: any) => {
    console.log('[ RNBF TASK Excuting ]', taskId);
    //Excute Your Task -
    BackgroundFetch.finish(taskId);
}

const onTimeout = async (taskId: any) => {
    console.log('[ RNBF TASK Failed ]', taskId);
    BackgroundFetch.finish(taskId);
}

export default Background;