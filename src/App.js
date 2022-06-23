import React, { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [toggleAddTask, setToggleAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "School Meeting",
      day: "Feb 6th at 2:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Gaming Program",
      day: "Feb 7th at 2:30pm",
      reminder: false,
    },
    {
      id: 4,
      text: "Foodie time",
      day: "Feb 5th at 2:30pm",
      reminder: true,
    },
  ]);

  ////add tasks
  const addTask = (addedTask) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...addedTask };
    setTasks([...tasks, newTask]);
  };

  ////delete tasks
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  ////toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        toggleAddTaskForm={() => setToggleAddTask(!toggleAddTask)}
        showAddTask={toggleAddTask}
      />
      {toggleAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No tasks remaining"
      )}
    </div>
  );
}

export default App;
