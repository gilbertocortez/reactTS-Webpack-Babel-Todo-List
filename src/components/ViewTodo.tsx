import React from 'react';

interface todosInterface {
    todo: string,
    completed: boolean
}

const ViewTodo = ({todo, index, completeTodo, removeTodo}: 
    { todo: todosInterface; index: number; completeTodo:any; removeTodo:any}) => { 
    return(
        <div className="todo">
            <p className="todoItem" style={{ textDecoration: todo.completed ? "line-through" : "" }}>
                {todo.todo}
                <button onClick={() => removeTodo(index)}>x</button>
                <button onClick={() => completeTodo(index)}>Complete</button>
            </p>
        </div>
    );
}

export default ViewTodo;