import React, { useState } from 'react'
import './style.css';
import { FaTrash, FaEdit } from "react-icons/fa";

function ToDoItem({task, deleteTask, editTask}) {
    const [status, setStatus] = useState(task.isComplete);
    function handleDelete(e) {
        deleteTask(task.id);
    }
    function handleEdit(e) {
        editTask(task.id);
    }
    function handleDone() {
        status?setStatus(false):setStatus(true);
    }

    let styleObj = {
        textDecoration:'line-through',
        color: 'rgb(192, 148, 148)',
        fontWeight: '500'
    }


  return (
    <div className='TaskBox'>
        <button onClick={handleDone} className='TickBtn'>{status?"✅":"🟦"}</button>
        <p className='Task' style={status?styleObj:{}}>{task.task}</p>
        <button onClick={handleEdit} className='edit'><FaEdit /></button>
        <button onClick={handleDelete} className='delete'><FaTrash /></button>
    </div>
  )
}

export default ToDoItem;