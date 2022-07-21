import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import Random from "./components/Random";

function App() {
  const [toggleAddTask, setToggleAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  ////Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  ////Fetch single task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  ////add tasks
  // const addTask = (addedTask) => {
  //   const id = Math.floor(Math.random() * 10000) + 1;
  //   const newTask = { id, ...addedTask };
  //   setTasks([...tasks, newTask]);
  // };
  ////add tasks to the server
  const addTask = async (addedTask) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedTask),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  ////delete tasks
  ////delete tasks from the server
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  ////toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
    ////updating the UI only
    // setTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, reminder: !task.reminder } : task
    //   )
    // );
  };

  return (
    <Router basename="/react-task-tracker">
      <div className="container">
        <Header
          toggleAddTaskForm={() => setToggleAddTask(!toggleAddTask)}
          showAddTask={toggleAddTask}
        />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                {toggleAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No tasks remaining"
                )}
              </>
            }
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/random" element={<Random />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
