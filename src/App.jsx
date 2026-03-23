import React, { useState } from 'react';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [tasks, setTasks] = useState([]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div style={{
            backgroundColor: darkMode ? '#333' : '#FFF',
            color: darkMode ? '#FFF' : '#000',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <h1>Task Management App</h1>
            <button onClick={toggleDarkMode}>
                Switch to {darkMode ? 'Light' : 'Dark'} Mode
            </button>
            <div>
                <input type="text" id="task-input" placeholder="Add a new task" />
                <button onClick={() => {
                    const taskInput = document.getElementById('task-input');
                    addTask(taskInput.value);
                    taskInput.value = '';
                }}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;