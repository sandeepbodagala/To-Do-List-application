import React, { useState } from 'react'
import ToDoItem from './ToDoItem';
import { tasks } from '../utils/tasks';
import './style.css';

function ToDoList() {
    const [val, setVal] = useState("");
    const [taskArr, setTaskArr] = useState(tasks);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    function handleChange(e) {
        setVal(e.target.value);
    }
    function handleClick() {
        if(val.trim()=="") {
            alert("Please enter a task");
            return;
        }
        const newTask = {
            id: taskArr.length+1,
            task: val,
            isComplete: false
        };
        setTaskArr([...taskArr, newTask]);
        setVal("");
    }
    function handleKey(e) {
        e.key=='Enter'&&handleClick()
    }

    function deleteTask(id) {
        const deletedArr = taskArr.filter(task=>task.id !== id);
        setTaskArr(deletedArr);
    }
    function editTask(id) {
        setEditingId(id);
        const task = taskArr.find(task=>task.id==id);
        setVal(task.task);
        setIsEditing(true);
    }
    function handleEdit() {
        const editedArr = taskArr.map(task=>{
            if(task.id==editingId) {
                const obj = {
                    id: task.id,
                    task: val,
                    isComplete: false
                }
                return obj;
            }
            return task;
        })
        setTaskArr(editedArr);
        setVal("");
        setIsEditing(false);
        setEditingId(null);
    }

  return (
    <main>
        <section className='addSection'>
            <input onKeyDown={handleKey} onChange={handleChange} value={val} className='addInput'></input>
            {
                isEditing?
                <button onClick={handleEdit} className='addBtn'>Save Changes</button>:
                <button onClick={handleClick} className='editBtn'>Add New Task</button>
            }
        </section>
        <section className='ListSection'>
            {taskArr.map((task)=>{
                return(
                    <ToDoItem editTask={editTask} deleteTask={deleteTask} task={task} key={task.id}/>
                )
            })}
        </section>
    </main>
  )
}

export default ToDoList;