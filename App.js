import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Make sure this line is here!

const API_URL = "http://127.0.0.1:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return; // Prevents adding empty tasks
    const res = await axios.post(API_URL, { title });
    setTasks([...tasks, res.data]);
    setTitle("");
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app-container">
      <div className="task-card">
        <h1 className="title">My Tasks</h1>
        
        <form onSubmit={addTask} className="task-form">
          <input 
            type="text"
            className="task-input"
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="What needs to be done?" 
          />
          <button type="submit" className="add-btn">Add</button>
        </form>

        <ul className="task-list">
          {tasks.length === 0 && <p className="empty-state">No tasks yet. Add one above!</p>}
          
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <span className="task-text">{task.title}</span>
              <button onClick={() => deleteTask(task.id)} className="delete-btn">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;