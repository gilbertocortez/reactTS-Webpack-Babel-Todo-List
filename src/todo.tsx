import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Todo.css';

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

const ToDoApp: React.FC = () => {
    const [todos, setTodos] = useState<todosInterface>([]);
    const [inputTodo, setInputTodo] = useState('');

    const addToDo = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const newTodos = [ ...todos, {todo: inputTodo, completed: false} ];
        setTodos( newTodos );
    }

    const removeTodo = (index:number) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };
    
    const completeTodo = (index:number) => {
        const newTodos = [...todos];
        newTodos[index].completed = true;
        setTodos(newTodos);
    };

    return (
        <div>
            <h1>Your To Do list</h1>
            <form>
                <label htmlFor="toDo">
                    <input type="text" name="toDo" id="toDo" onChange={e => setInputTodo(e.target.value)}/>
                    <button onClick={addToDo}>Add to do</button>
                </label>
            </form>
            <div>{todos.map( 
                (todo: todosInterface, index:number) => 
                    <ViewTodo 
                        todo={todo} 
                        index={index}
                        completeTodo={completeTodo}
                        removeTodo={removeTodo}
                    />)}</div>
        </div>
    );
}

ReactDOM.render(<ToDoApp />, document.getElementById('root'));