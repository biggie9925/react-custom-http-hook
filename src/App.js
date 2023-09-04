import React, { useEffect, useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http'

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {

    const transformTasks = ((tasksObj) => {
      console.log ("taskObj: ", tasksObj)
      const loadedTasks = [];
  
      //transform from firebase objects to objects to suit our frontend
      for (const taskKey in tasksObj) {
        console.log("taskKey: ", taskKey)
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
  
      setTasks(loadedTasks);
    })

    fetchTasks({url: 'https://react-custom-http-hook-fe32d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json'}, transformTasks);
  
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
